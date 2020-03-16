# Juniors Spring Intensive Deliverable Proposal

Dates 3/16-3/25

**My Name:** 
Gabriel Lee

**Project Name:** 
Twist

**Is your project New or Old?**
Semi-old. Incomplete project that has been shelved for a while.

**Is your project Solo or Team?**
Solo

## Description
This project is the result of a lot of theory crafting from my first intensive project (Brew cocktail recommendations), a lot of hours talking theory with Alan, and my obsession with graphs.

The goal of the project is to provide an interactive exploration website that lets you explore the "flavor-space" of cocktail ingredients. This is done by compiling all cocktails into a "network" structure of interconnecting ingredients. So from one ingredient like "lime" you can find surrounding ingredients that are also similarly used like "mint" or "gin".

NOTE: I use graph and network interchangably here. Keep in mind when I say graph I'm referring to the mathematical structure of a graph, or in lamen, a network.

Currently the app has two parts:

Flask backend
- Data scrapper to scrape the preexisting cocktail database of cocktails (does this automatically already on start-up).
- Data compiler to compile a graph based off cocktail ingredients and which cocktails they exist in (does this automatically on start-up).
- Serve raw JS react files to frontend.
- Has a couple endpoints to get the cocktail graph off the server.

React frontend
- Using a raw js file build we can generate the frontend files that flask will serve.
- It will hit an endpoint to get the graph data.
- It will then simulate the graph data with D3-Force.

---

Features needed to be added in order of importance:
- Get the D3-Force simulation to update properly using the React State object.
- Provide UI or possible API to allow the user to search the network by either ingredient or drink to then isolate that part of the network in the simulation.
    Note: this is because the network alone encompasses somewhere around 350 unique ingredients and 12,000 unique "associations". It's impossible to navigate this as is, so breaking it down will make it much more functional.
- Add on-click functionality of ingredients that let you "explore" in that direction
    Note: Say for example I've isolated a gin and tonic on the simulation. If I want to "explore" in the "lime" direction I can double click the ingredient to have the connections that "lime" has to the network. Ideally this means I can continue to explore in that given direction.
- Add graph coloring by performing PCA ([principle component analysis](https://en.wikipedia.org/wiki/Principal_component_analysis)) and coloring based off of the cocktail "genre vectors" generated.
- Make the UI mobile reactive
- Add nontechnical-friendly UI to provides the basic functionality of the tool without all the jazz.
    This would mean a basic function like inputting an ingredient and getting recommendation of the most used ingredients to go with it. This would likely mean a new API endpoint.



## Challenges I Anticipate

- Deployment. This project is complex working with a couple different languages, more than several technologies, and a couple self implmented mathematical theories, I expect more things than I can count to break. Enviroment in particular will be a pain since I'm running Flask to server React, and React to serve D3.
- Simulation issues. Implementation is sort of complex task with React and D3 with very minimal documentation (if any at all). This will mostly just be debugging as I'm marginally familiar with both technologies.
    Features this concerns is the first three features of the above list. 
- PCA coloring implementation. I think I will have to implement the math myself which can be complicated since I will have to work with an unfamiliar matrix library. Also the results may not be what I want so I may have to scrap the method together and look at other coloring/clustering methods.
- Mobile friendly may just not be possible. With either viewport, webpack, or processing restrictions. However this is a far off goal but I feel it adds a lot of value to the functionality.

## Skateboard

Just getting the simulation working here I would consider the skateboard.

## Bike

Adding the simulation interaction and exploration along with coloring.

## Car

Finishing off with embellishment features like mobile functionality, tl;dr friendly UI, and API additional API endpoints for data collection.

## Personal Achievement Goals:

Getting to the bike is my goal here. The Car features can always be tacked on later easily. The core technology is what I want to get running, and implemented well.

## Wireframes

![simulation concept](https://imgur.com/a/Gu8Zofr)

## Evaluation

**You must meet the following criteria in order to pass the intensive:**

- Students must get proposal approved before starting the project to pass
- SOLO 
    - must score an average above a 2.5 on the [rubric]
- TEAM 
    - Must score an average above 3 on the [rubric]
    - Each individual completes 2 of the 3 personal achievement goals from their proposal
- Pitch your product

[rubric]:https://docs.google.com/document/d/1IOQDmohLBEBT-hyr-2vgw1mbZUNsq3fHxVfH0oRmVt0/edit


## Approval Checklist
- [ ] If I have a team project, I wrote this proposal to represent my work and only my work
- [ x ] I have completed all the necessary parts of this proposal
- [ x ] I linked my proposal in the Spring Intensive Tracker

### Sign off

**Student Name:**                
> Gabriel Lee | March 16th, 2020
**Make School Advisor Name**
> TBD