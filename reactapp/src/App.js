import React, {Component} from "react";

import Nav from "./components/nav";
import Sidebar from  "./components/sidebar";
import GraphChart from "./components/chart";

import Part from "./part";

import styled from "styled-components";

class App extends Component{
  constructor(props) {
    super(props);
    this.setGraphData = this.setGraphData.bind(this);
    this.addPart = this.addPart.bind(this);
    this.removePart = this.removePart.bind(this);
    this.state = {
      graphData: null,
      partBucket: [],
    }
  }

  componentDidMount(){
    fetch("/api/graph")
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({graphData: result})
        },
        (error) => {
            console.log(error);
        });
  }

  updateGraph(){
    if(this.state.partBucket.length === 0){
      return undefined;
    }
    let nodes = new Set();
    this.state.partBucket.map(part => { // merged all parts in the bucket into one big union (therefore no duplicates)
      nodes = part.union(nodes);
    });
    let data = {nodes: Array.from(nodes)}; // puts into dictionary format
    fetch('/api/subgraph', {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then((response) => { return response.json(); })
    .then((data) => {
      this.setGraphData(data);
    })
  }

  setGraphData(data) {
    this.setState({graphData: data});
  }

  addPart(part) {
    this.setState(prevState => ({
      partBucket: [...prevState.partBucket, part]
    }), this.updateGraph);
  }

  removePart(group, id) {
    let filtered = this.state.partBucket.filter((ele) => {
      return !((ele.group == group) && (ele.id == id))
    })
    this.setState({
      partBucket: filtered,
    }, this.updateGraph);
  }

  render() {
    //STYLE
    const App = styled.div`
      background-color: ${props => props.theme.bg};
      color: ${props => props.theme.secondary};
    `;

    const Content = styled.div`
      display: grid;
      grid-template-columns: 1fr 4fr;
      width: 100%;
    `;
    
    //FUNCTIONS
    const token = window.token;

    return(
      <App>
        <Nav />
        <Content>
          <Sidebar 
            addPart={this.addPart}
            removePart={this.removePart}
            partBucket={this.state.partBucket}
            setGraphData={this.setGraphData}
          />
          <GraphChart 
            graphData={this.state.graphData}
          />
        </Content>
      </App>
    );
  }

}

export default App;