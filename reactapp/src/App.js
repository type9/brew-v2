import React, {Component} from "react";

import Nav from "./components/nav";
import Sidebar from  "./components/sidebar";
import GraphChart from "./components/chart";

import styled from "styled-components";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      history : [
        {
          simulation: null
        }
      ],
      graphLoaded: false,
      graphData: null,
    }
  }

  componentDidMount(){
    fetch("/api/graph")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            graphLoaded: true,
            graphData: result,
          });
        },
        (error) => {
          this.setState({
            graphLoaded: false,
            error
          });
        }
      )
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
          <Sidebar />
          <GraphChart />
        </Content>
      </App>
    );
  }

}

export default App;