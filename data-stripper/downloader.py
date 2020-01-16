from dotenv import load_dotenv

from sys import stdout
import os, time, signal, requests, json

load_dotenv()

class CocktailDownloader():
    '''Utilizes thecocktaildb.com to download all cocktail data'''
    def __init__(self, request_msbuffer=0, retries=5):
        self.key = os.getenv("COCKTAILDB_API_KEY")
        self.msbuffer = request_msbuffer
        self.retries = retries

    def get_cocktail_list(self):
        '''Gets list of all cocktails'''
        alc_req = f'https://www.thecocktaildb.com/api/json/v2/{self.key}/filter.php?a=Alcoholic'
        nonalc_req = f'https://www.thecocktaildb.com/api/json/v2/{self.key}/filter.php?a=Non_Alcoholic'

        alc_resp = requests.get(alc_req).json()
        nonalc_resp = requests.get(nonalc_req).json()

        list = []

        count = 0
        for drink in alc_resp['drinks']:
            list.append(drink)
            count += 1
        
        for drink in nonalc_resp['drinks']:
            list.append(drink)
            count += 1

        with open('cocktail_list.txt', 'w') as outfile:
            json.dump(list, outfile)
        
        print(f'[CocktailDownloader]Added {count} drink(s) to list')
    
    def get_cocktails(self, force_overwrite=False):
        '''From the list of cocktails, get the cocktail data and store in cocktails.txt.
        If the id already exists in our checklist we don't request the data again. If force_overwrite is true,
        we reset the checklist and request all data again.'''
        cocktail_by_id = f'https://www.thecocktaildb.com/api/json/v2/{self.key}/lookup.php?i='

        # This block checks for the existence of the needed files.
        cocktail_list = [] # stores the list of cocktails we need to find
        try: 
            with open('cocktail_list.txt') as list:
                cocktail_list = json.load(list)
        except FileNotFoundError:
            print('[CocktailDownloader] No list. Run get_list() before running get_cocktails(). Exiting...')
            exit(0)
        cocktail_list_size = len(cocktail_list) # total amount of cocktails we have to check

        cocktail_checklist = {}
        if not force_overwrite: # if we only want to fill in cocktails we don't already have
            try:
                with open('cocktail_checklist.txt') as checklist:
                    cocktail_checklist = json.load(checklist)
            except FileNotFoundError:
                print('[CocktailDownloader] No checklist. Will create.')

        cocktail_data = [] # stores the final data
        if not force_overwrite: # ignores previous deta if we're overwriting
            try:
                with open('cocktails.txt') as data_file:
                    cocktail_data = json.load(data_file)
            except FileNotFoundError:
                print('[CocktailDownloader] No already existing data. Will create.')

        def save_progress():
            with open('cocktail_checklist.txt', 'w') as checklist:
                json.dump(cocktail_checklist, checklist)
            
            with open('cocktails.txt', 'w') as data_file:
                json.dump(cocktail_data, data_file)
            
            print('Done!')
        
        # This block handles the keyboard interrupt
        def keyboardInterruptHandler(signal, frame):
            print("[CocktailDownloader] Interrupt detected. Saving progress...",)
            save_progress()
            os._exit(0) # ends threaded download process

        signal.signal(signal.SIGINT, keyboardInterruptHandler) # registers handler

        print(f'\n[CocktailDownloader] Loaded {cocktail_list_size} drinks to download. <CTRL + C> to save progress and exit.')
        #   This block makes a call of each drink in the cocktail_list and appends it to cocktail_data if successful.
        download_count = 0
        for cocktail in cocktail_list:
            id = cocktail['idDrink']
            if not id in cocktail_checklist: # if we don't have the id in our checklist
                data = None

                retry = True
                retry_count = 0
                while retry: # runs for a maximum number of retries on timeout
                    try:
                        response = requests.get(cocktail_by_id + id) # we request the data by id
                        response.raise_for_status()
                        data = response.json()
                        retry = False
                    except requests.exceptions.Timeout:
                        retry_count += 1
                    except requests.exceptions.TooManyRedirects:
                        print('Redirect error. Perhaps bad key?')
                        retry = False
                    except requests.exceptions.RequestException as error:
                        print(error)
                        exit(0)
                    except:
                        retry_count += 1
                    # except response.HTTPError as error:
                    #     print(error)
                    #     print('Perhaps bad key?')
                    #     sys.exit(1)

                    if retry_count >= self.retries: # if we reach max retries
                        print(f'[CocktailDownloader] Max reties met for id: {id}. Skipping.')
                        break
                    
                    time.sleep(self.msbuffer/1000) # if we need to retry we buffer

                if data: # if we successfully got the data
                    cocktail_data.append(data) # append it to our final data list
                    cocktail_checklist[id] = True # update our checklist

                time.sleep(self.msbuffer/1000) # after each request we buffer

            # Logs the progress of the downloader
            download_count += 1
            stdout.write(f'[CocktailDownloader] Downloaded {download_count} out of {cocktail_list_size}\r')
            stdout.flush()
        
        save_progress()

def main():
    import sys
    arguments = sys.argv[1:]  # Exclude script name in first argument

    downloader = CocktailDownloader()
    downloader.get_cocktail_list()
    downloader.get_cocktails()

if __name__ == '__main__':
    main()