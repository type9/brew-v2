import os, sys
import json
from flask import Flask, render_template
from pathlib import Path

import networkx as nx
# Data modules
from data_stripper.downloader import CocktailDownloader
from data_stripper.cleaner import DataCleaner
from data_stripper.grapher import IngredientGraph

app = Flask(__name__)

# Directories
DATASTRIP_DIR = Path("flaskserver/data_stripper")
DATA_DIR = Path("flaskserver/data")
DATA_FILE = "cocktail_data.txt"
CLEANDATA_FILE = "cleaned_data.bin"

# Data download routine
downloader = CocktailDownloader(DATA_DIR)
def get_data():
    downloader.get_cocktail_list()
    downloader.get_cocktails()
    DataCleaner(DATA_DIR/DATA_FILE, DATA_DIR/CLEANDATA_FILE)

get_data() # intialize and dowload data
graph = IngredientGraph(DATA_DIR/CLEANDATA_FILE) # create the graph
#Initialization of server

@app.route("/")
def index():
    return render_template("index.html", token="flaskreact")


# API
@app.route("/api/graph")
def get_graph():
    return json.dumps(nx.node_link_data(graph))

if __name__ == '__main__':
    app.run(debug=True)