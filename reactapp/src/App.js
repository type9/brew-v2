import React, {Component} from "react";

import Nav from "./components/nav";
import Sidebar from  "./components/sidebar";
import GraphChart from "./components/chart";

import styled from "styled-components";

class App extends Component{
  constructor(props) {
    super(props);
    this.setGraphData = this.setGraphData.bind(this);
    this.addPart = this.addPart.bind(this);
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
        }
    );
  }

  setGraphData(data) {
    this.setState({graphData: data});
  }

  addPart(data) {
    console.log("Added " + data);
    this.setState({
      partBucket: [...this.state.partBucket, data]
    });
  }

  render() {
    //STYLE
    const App = styled.div`
      background-color: ${props => props.theme.bg};
      color: ${props => props.theme.seconadry};
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