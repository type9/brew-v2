import pickle
import networkx as nx
from data_stripper.cleaner import Drink
from pathlib import Path

class IngredientGraph(nx.Graph):
    '''Builds graph from drink objects. Accepts array of drink
    objects stored as binary'''
    def __init__(self, data_path, scale=10, inverse_weight=True):
        super(IngredientGraph, self).__init__()
        self.drinks = None
        self.scale = scale

        with open(Path(data_path), 'rb') as data_file:
            self.drinks = pickle.load(data_file)
        
        self.build()
        self.inverse_edges()

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
            self.edges[edge]['weight'] = (1/self.edges[edge]['weight']) * self.scale

def main():
    import matplotlib.pyplot as plt
    graph = IngredientGraph('data/cleaned_data.bin')

    print(f'{nx.info(graph)}')
    
    options = {
        'with_labels':  True,
        'font_color': 'black',
        'node_size': 50,
        'width': 0,
    }

    graph.remove_node('Water')
    graph.remove_node('Sugar')
    graph.remove_node('Ice')

    nx.draw_kamada_kawai(graph, **options)
    plt.savefig('graph.png')
    plt.show()

if __name__ == '__main__':
    main()