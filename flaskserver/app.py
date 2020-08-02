import os, sys
import json
from flask import Flask, render_template, request, jsonify
from pathlib import Path

import networkx as nx
# Data modules
from data_stripper.downloader import CocktailDownloader
from data_stripper.cleaner import DataCleaner
from data_stripper.grapher import IngredientGraph

# Directories
DATASTRIP_DIR = Path("data_stripper")
DATA_DIR = Path("data")
DATA_FILE = "cocktail_data.txt"
CLEANDATA_FILE = "cleaned_data.bin"

# Data download routine
downloader = CocktailDownloader(DATA_DIR)
def get_data():
    downloader.get_cocktail_list()
    downloader.get_cocktails()
    DataCleaner(DATA_DIR/DATA_FILE, DATA_DIR/CLEANDATA_FILE)

get_data() # intialize and dowload data
graph_options = {
    'scale': 10,
    'inverse_weights': True,
    'similarity': True
}
graph = IngredientGraph('data/cleaned_data.bin', **graph_options) # create the graph
#Initialization of server

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", token="flaskreact")


# API
@app.route("/api/graph")
def get_graph():
    return json.dumps(nx.node_link_data(graph))

@app.route("/api/subgraph", methods=['POST'])
def get_subgraph():
    nodes = request.get_json(force=True)['nodes']
    subgraph = graph.subgraph(nodes)
    return json.dumps(nx.node_link_data(subgraph))

@app.route("/api/similaritytable", methods=['GET'])
def get_similarity_table():
    return graph.similarity_table

@app.route("/api/similarity", methods=['POST'])
def get_smiliarity():
    nodes = request.get_json(force=True)['nodes']
    return json.dumps(graph.suggest_similar(nodes)[:5])


@app.route("/healthcheck", methods=['POST'])
def get_healthcheck():
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

if __name__ == '__main__':
    app.run(debug=True, host= '0.0.0.0')