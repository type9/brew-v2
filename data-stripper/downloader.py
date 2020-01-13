from dotenv import load_dotenv
import os

import requests
import json

load_dotenv()

class CocktailDBDownloader():
    def __init__(self):
        self.key = os.getenv("COCKTAILDB_API_KEY")
    
    def get_cocktail_list(self):
        alc_req = f'https://www.thecocktaildb.com/api/json/v2/{self.key}/filter.php?a=Alcoholic'
        nonalc_req = f'https://www.thecocktaildb.com/api/json/v2/{self.key}/filter.php?a=Non_Alcoholic'

        alc_resp = requests.get(alc_req).json()
        nonalc_resp = requests.get(nonalc_req).json()

        list = ['drinks']

        count = 0
        for drink in alc_resp['drinks']:
            list.append(drink)
            count += 1
        
        for drink in nonalc_resp['drinks']:
            list.append(drink)
            count += 1
        
        with open('cocktail_list.txt', 'w') as outfile:
            json.dump(list, outfile)
        
        print(f'Got {count} drink(s)')
    
    def get_cocktails(self):
        drink_req = f'https://www.thecocktaildb.com/api/json/v1/{self.key}/lookup.php?i='

        cocktails = 
        with open('cocktails.txt') as cocktails_file:
            pass
        pass
    
    def build_database(self):
        pass

def main():
    import sys
    arguments = sys.argv[1:]  # Exclude script name in first argument

    downloader = CocktailDBDownloader()
    downloader.get_cocktail_list()

if __name__ == '__main__':
    main()