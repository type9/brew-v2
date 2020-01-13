from dotenv import load_dotenv
import os

load_dotenv()
class CocktailDBDownloader():
    def __init__(self):
        key = os.getenv("COCKTAILDB_API_KEY")

def main():
    import sys
    arguments = sys.argv[1:]  # Exclude script name in first argument

if __name__ == '__main__':
    main()