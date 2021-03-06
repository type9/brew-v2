import pickle
import networkx as nx
from data_stripper.cleaner import Drink
from pathlib import Path
from collections import OrderedDict
import math

class IngredientGraph(nx.Graph):
    '''Builds graph from drink objects. Accepts array of drink
    objects stored as binary'''
    def __init__(self, data_path=None, **kwargs):
        '''
        key arguements:
            data_path (default=None) = path to data
            scale (default=10) = scale of graph
            inverse_weight (default=False) = weight so that more relationship means lower weight
            similarity (default=False) = calculate weighted jaccard similarity look-up table (dict)
        '''
        super(IngredientGraph, self).__init__()
        self.drinks = None
        self.scale = 10000
        self.similarity_table = None

        if data_path:
            with open(Path(data_path), 'rb') as data_file:
                self.drinks = pickle.load(data_file)

        # if kwargs['scale'] is int:
        #     self.scale = kwargs['scale']
        if self.drinks:
            self.build()
            if kwargs['inverse_weights']:
                self.inverse_edges()
                self.normalize_edges()
            if kwargs['similarity']:
                self.build_weighted_jaccard()
        # else:
        #     raise ValueError('Data path invalid or no data found on file')

    def build(self):
        count = 0
        for drink in self.drinks: # for each drink
            if not drink.is_alcoholic:
                continue

            for ingredient in drink.ingredients: # we look at each ingredient
                for other_ingredient in drink.ingredients: # compare to each other
                    if ingredient == other_ingredient: # prevent self-loop edge
                        continue 

                    old_weight = 0
                    try:
                        old_weight = self[ingredient][other_ingredient]['weight']
                    except:
                        pass

                    self.add_edge(ingredient, other_ingredient, weight=old_weight+1) # add edge between the two (different) ingredients
                    count += 1
        
        print(f"[Grapher] Built graph with {count} associations")

    def inverse_edges(self):
        for edge in self.edges():
            self.edges[edge]['weight'] = (1/self.edges[edge]['weight'])
    
    def normalize_edges(self):
        total = 0
        for edge in self.edges():
            total += self.edges[edge]['weight']

        for edge in self.edges():
            weight = self.edges[edge]['weight']
            self.edges[edge]['weight'] = weight/total * self.scale

    def build_weighted_jaccard(self):
        '''Calculated a weighted jaccard coefficient

        Calculated using this formula
        (A && B) / (A | B)
        Where A & B are sets of neighbors. And W is the weight value of the edge between two valuesz
        '''
        nodes = list(self.nodes())
        # lengths = dict(nx.all_pairs_shortest_path_length(self, weight="weight"))
        table = {}

        iter = 1 # tracks number of iterations to avoid repeated calculations (only once per unique pair)
        for a in nodes:
            for b in nodes[iter:]:
                junction = nx.common_neighbors(self, a, b)

                sum = 0
                num_weights = 0

                shared_sum = 0
                for node in junction:
                    # modifier = 1/math.pow(len(self[node].items()), 2)
                    shared_sum += (self[node][a]['weight'])
                    shared_sum += (self[node][b]['weight'])
                    num_weights += 1
                
                total_sum = 0
                for node in self[a].items():
                    total_sum += node[1]['weight']
                for node in self[b].items():
                    total_sum += node[1]['weight']
                


                param_a = 15
                param_c = 45
                x = sum
                # score = ( (-1) / (1 + math.pow(math.e, (-1 * param_a)(x - param_c) ) + 1
                score = shared_sum/total_sum

                # this section handles lookup table update
                if a in table: # see if we already have a in table
                    a_table = table[a] # copy the a table
                    a_table[b] = score # add entry
                    table[a] = a_table # update table
                else: # otherwise we create the table
                    a_table = {b: score}
                    table[a] = a_table
                if b in table: # same update to b table
                    b_table = table[b]
                    b_table[a] = score
                    table[b] = b_table
                else:
                    b_table = {a: score}
                    table[b] = b_table

            iter += 1 # increase interation counter

        entries = table.keys()
        for entry in entries: # converts internal tables into sorted arrays sorted by descending score
            subtable = table[entry]
            table[entry] = sorted(subtable.items(), key=lambda x: x[1], reverse=True)

        self.similarity_table = table
    
    def suggest_similar(self, nodes):
        suggest_table = {}

        for node in nodes:
            for other_node in self.similarity_table[node]: # for each score for that node
                if node[1] == 0: #catches 0 scores and ignores them
                    continue

                if other_node[0] in suggest_table: # see if its in the running table
                    suggest_table[other_node[0]] += other_node[1]
                else: # if not add it
                    suggest_table[other_node[0]] = other_node[1]

        for node in nodes: # removes the nodes in question from the table
            if node in suggest_table:
                suggest_table.pop(node)

        return sorted(suggest_table.items(), key=lambda x: x[1], reverse=True) # sort by descending score and return
                    
def main():
    import matplotlib.pyplot as plt
    import os
    os.chdir('../')
    graph_options = {
        'scale': 10,
        'inverse_weights': True,
        'similarity': True
    }
    graph = IngredientGraph('data/cleaned_data.bin', **graph_options)
    print(graph.similairty_table)

    # print(f'{nx.info(graph)}')
    
    # options = {
    #     'with_labels':  True,
    #     'font_color': 'black',
    #     'node_size': 50,
    #     'width': 0,
    # }

    # graph.remove_node('Water')
    # graph.remove_node('Sugar')
    # graph.remove_node('Ice')

    # nx.draw_kamada_kawai(graph, **options)
    # plt.savefig('graph.png')
    # plt.show()

if __name__ == '__main__':
    main()