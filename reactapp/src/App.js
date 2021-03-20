import React, {useState, useEffect, useRef} from "react";

import Nav from "./components/nav";
import Sidebar from  "./components/sidebar";
import GraphChart from "./components/GraphChart";

import Part from "./part";
import DefaultDrink from  "./default-data.json";

import styled from "styled-components";

function App(){
  let defaultDrink = new Part(DefaultDrink["drinks"][0])
  const [partBucket, setPartBucket] = useState([defaultDrink]);

  function addPart(part) {
    setPartBucket([...partBucket, part])
  }

  function removePart(group, id) {
    let filtered = partBucket.filter((ele) => {
      return !((ele.group == group) && (ele.id == id))
    })
    setPartBucket(filtered);
  }

  //STYLE
  const App = styled.div`
    background-color: ${props => props.theme.bg};
    color: ${props => props.theme.secondary};
  `;

  const Content = styled.div`
    display: grid;
    grid-template-columns: 300px calc(100vw - 300px);
    width: 100%;
  `;
  
  //FUNCTIONS
  const token = window.token;

  return(
    <App>
      <Nav />
      <Content>
        <Sidebar 
          addPart={addPart}
          removePart={removePart}
          partBucket= {partBucket}
        />
        <GraphChart
          partBucket= {partBucket}
        />
      </Content>
    </App>
  );

}

export default App;