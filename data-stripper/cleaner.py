import json, pickle
from pathlib import Path

class Drink():
    '''The simplifid model for serialization'''
    def __init__(self, id, name, ingredients=[]):
        self.id = id
        self.name = name
        self.ingredients = ingredients
        self.is_alcoholic = None

class DataCleaner():
    '''Simplifies cocktail data to prep for building'''
    def __init__(self, data_path, destination_path):
        self.data = []

        with open(Path(data_path), 'r') as data_file:
            self.data = json.load(data_file)
        
        cleaned_data = []
        for drink_data in self.data:
            cleaned_data.append(self.build_drink(drink_data))
        
        with open(Path(destination_path), 'wb') as destination_file:
            pickle.dump(cleaned_data, destination_file)

    def get_ingredients(self, drink_data):
        ingr_str = 'strIngredient'
        max_ingr = 15

        ingr_list = []
        for num in range(max_ingr):
            ingr = drink_data[ingr_str + str(num + 1)]
            if not ingr == None:
                ingr_list.append(drink_data[ingr_str + str(num + 1)])

        return ingr_list
    
    def build_drink(self, drink_data):
        id = drink_data['idDrink']
        name = drink_data['strDrink']

        drink = Drink(id, name, self.get_ingredients(drink_data))

        if drink_data['strAlcoholic'] == 'Alcoholic':
            drink.is_alcoholic = True
        elif drink_data['strAlcoholic'] == 'Non alcoholic':
            drink.is_alcoholic = False
        
        return drink

def main():
    DataCleaner('data/cocktail_data.txt', 'data/cleaned_data.bin')

if __name__ == '__main__':
    main()