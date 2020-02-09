import React, {Component} from "react";

import Nav from "./components/nav"
import Sidebar from  "./components/sidebar"
import GraphChart from "./components/chart"

import styled from "styled-components"

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      history : [
        {
          simulation: null
        }
      ],
      graphData: [],
    }
  }

  render() {
    //STYLE
    const App = styled.div`
      background-color: ${props => props.theme.bg};
      color: ${props => props.theme.seconadry};
    `;
    
    //FUNCTIONS
    const token = window.token

    return(
      <App>
        <Nav />
        <Sidebar />
        <GraphChart />
      </App>
    );
  }

}

export default App;