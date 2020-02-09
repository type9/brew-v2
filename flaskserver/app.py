import os, sys
from flask import Flask, render_template

from pathlib import Path
# Data modules
from data_stripper.downloader import CocktailDownloader
from data_stripper.cleaner import DataCleaner
from data_stripper.grapher import IngredientGraph

app = Flask(__name__)

# Directories
DATASTRIP_DIR = Path("flaskserver/data_stripper")
DATA_DIR = Path("flaskserver/data")
_PATH = DATA_DIR/DATASTRIP_DIR
DATA_FILE = "cocktail_data.txt"
CLEANDATA_FILE = "cleaned_data.bin"

# Data download routine
downloader = CocktailDownloader(DATA_DIR)
def get_data():
    downloader.get_cocktail_list()
    downloader.get_cocktails()
    DataCleaner(DATA_DIR/DATA_FILE, DATA_DIR/CLEANDATA_FILE)

get_data()
#Initialization of server

@app.route("/")
def index():
    return render_template("index.html", token="flaskreact")

@app.route("/api/graph")
def get_graph():
    return

if __name__ == '__main__':
    app.run(debug=True)