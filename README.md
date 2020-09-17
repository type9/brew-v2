-> Please see [this doc](https://docs.google.com/document/d/19zBG6jBr9OLV41l279aQZU2XZ7ffnZ-fYobrdh5ccDw/edit?usp=sharing) for images

## TWIST Alpha Overview - [LIVE](https://alpha.twist.run/)


##  \
What is TWIST?

	Twist is an attempt to visualize interactions of ingredients in the “cocktail flavor space”. It does this by parsing a live database of cocktails to gather data about ingredient relationships.

This helps in achieving a few primary goals.



1. Understand what ingredients are frequently paired with what
2. Understand what pairings might be making up the “core” of a certain drink.
3. Give suggestions for pairing in the event of making a drink that might not already exist

The end goal of TWIST is to provide an engine for understanding how ingredients tend to be used and to suggest how they might be able to be used further.


## How do I use TWIST?


### Core Components

The current alpha version provides 4 basic features to try to achieve the listed goals.


#### 1 - Search for Ingredient or Cocktail

Types keywords such as ingredients or cocktail names into the bar to get back ingredients or cocktails. You might need to scroll down to see the ingredients as they’re listed after cocktails. Click on an item to add it to the visualization.


#### 2 - List of current simulated ingredients/cocktails

Once added, the item will be added to the list and can be removed later by clicking the trash icon. It’s important to note here that ingredients can only appear once, so if you add duplicates it won’t change the visualization.

For reference:

Drinks -> a collection of ingredients

Ingredients -> a single ingredient represented as a point on the visualization.


#### 3 - Suggestions

The app will attempt to suggest related ingredients based off of the ones currently present in the simulation. Think of these results as search engine results; the results show how often two appear close to each other, not necessarily that they’re always in the same drink.

The number is just the behind the scenes score and doesn’t represent anything other than an arbitrary score used by the code so that you can compare scores to each other to see what the results of the algorithm are.


#### 4 - Visualization

The visualization is simply a collection of the ingredients with lines between them representing their “strength” together or how often they’re used together. Wider lines pull ingredients closer representing two ingredients that are paired more frequently.


### Interpreting the Visualization


#### Groupings

Let’s take our Mojito visualization for example. We can see that Soda water is located far from the primary grouping of sugar, lime, rum, and mint. Generally what this shows is that the grouping makes up the “core” of the drink and the weaker ingredient is more of an additive. This stays true for most popular drinks but holds up less when looking at more obscure drinks due to the lack of data.


#### Visualizing Multiple Drinks

In some cases we might want to see the interaction of multiple drinks together. In this case we have added Tom Collins to our Mojito simulation so we add only a few more ingredients. Notice that the core of the visualization is still present.

High density between multiple ingredients in more than one drink tends to imply interchangeability between ingredients.


#### Branches

In the above picture we have visualized a Negroni and  Martini which share Gin as a common ingredient. We can see that the visualization branches off in two directions (Olive or Campari) which implies that these two drinks deviate from each other.


## Feedback Questions

Contact me with feedback at [gabespersonal@gmail.com](mailto:gabespersonal@gmail.com)



1. Do you feel the visualization adequately shows interactions between ingredients? Why or why not (examples if possible)?
2. Do you feel the suggestions make sense in general? Why or why not (examples if possible)?
3. What features do you think could be added to improve your understanding of the visualization, data, etc.?
4. (For bartenders or those in industry) Would you use this product professionally, personally, or both? Why?


## Dev Stuff


### API

API is still under construction but technically there. If you would like to use the graph data or would like a custom endpoint email me at [gabespersonal@gmail.com](mailto:gabespersonal@gmail.com)


### Stack

Raw Data - [https://www.thecocktaildb.com/](https://www.thecocktaildb.com/)

Backend Python - Flask, Networkx (and a few other data processing libraries)

Frontend Javascript - React, D3, MaterialUI


## Known Issues

Please contact me through email at [gabespersonal@gmail.com](mailto:gabespersonal@gmail.com) if additional issues are found



1. Data not clean - causes weird search results such as upper/lowercase ingredients that are different
2. Similar ingredients aren’t merged - club soda versus soda water for example
3. Certain (common) ingredients aren’t appearing on search even though they should be
4. Duplicate items can be added to no effect - no effect is intended, showing twice is not