import React, {Component} from "react";

import Nav from "./components/nav"

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
    }
  }

  render() {
    //STYLE
    const App = styled.div`
      background-color: ${props => props.theme.bg};
      color: ${props => props.theme.seconadry};

      height: 16em;
    `;
    
    //FUNCTIONS
    const token = window.token

    return(
      <App>
        <Nav />
        <h1>Token = {token}</h1>
      </App>
    );
  }

}

export default App;