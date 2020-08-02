import React, {useState, useEffect} from "react";

import Nav from "./components/nav";
import Sidebar from  "./components/sidebar";
import GraphChart from "./components/GraphChart";
import PartCard from "./components/partcard";

import styled from "styled-components";


function App(){
  // constructor(props) {
  //   super(props);
  //   this.setGraphData = this.setGraphData.bind(this);
  //   this.addPart = this.addPart.bind(this);
  //   this.removePart = this.removePart.bind(this);
  //   this.setFocusedItem = this.setFocusedItem.bind(this);
  //   this.state = {
  //     graphData: null,
  //     graphVersion: 1,
  //     partBucket: [],
  //     sugggestedItems: [],
  //     focusedItem: null,
  //   }
  // }
  const [graphData, setGraphData] = useState(null);
  const [graphVersion, setGraphVersion] = useState(1);
  const [partBucket, setPartBucket] = useState([]);
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [focusedItem, setFocusedItem] = useState(null);
  // const [state, setStateData] = useState({graphData: null,
  //        graphVersion: 1,
  //        partBucket: [],
  //        sugggestedItems: [],
  //        focusedItem: null,
  //       });

  //const setState = (obj)=> setStateData({...state, ...obj});
  useEffect(()=>{
    fetch("/api/graph")
    .then(res => res.json())
    .then(
        (result) => {
            setGraphData(result)
        },
        (error) => {
            console.log(error);
        });
  },[]);
  

  function updateGraph(){
    if(partBucket.length === 0){
      return undefined;
    }
    let nodes = new Set();
    partBucket.map(part => { // merged all parts in the bucket into one big union (therefore no duplicates)
      nodes = part.union(nodes);
    });
    let data = {nodes: Array.from(nodes)}; // puts into dictionary format
    fetch('/api/subgraph', {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then((response) => { return response.json(); })
    .then((data) => {
      setGraphData(data);
      setGraphVersion(graphVersion + 1)
    })

    fetch('/api/similarity', { //updates suggested items as well
      method: "POST",
      body: JSON.stringify(data)
    })
    .then((response) => { return response.json(); })
    .then((data) => {
      setSuggestedItems(data);
    })
  }
  //useEffect(()=>{updateGraph()},[partBucket])

  // function setGraphData(data) {
  //   setState({
  //     graphData: data,
  //     graphVersion: state.graphVersion + 1
  //   });
  // }

  // function setSuggestedItems(items) {
  //   setState({suggestedItems: items});
  // }

  // function setFocusedItem(item) {
  //   if(item == state.focusedItem){
  //     return;
  //   }
  //   setState({focusedItem: item});
  // }

  function addPart(part) {
    setPartBucket([...partBucket, part])

    // setState({
    //   partBucket: [...state.partBucket, part]
    // }, updateGraph);
  }

  function removePart(group, id) {
    let filtered = partBucket.filter((ele) => {
      return !((ele.group == group) && (ele.id == id))
    })
    setPartBucket(filtered);
  }

  //render() {
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
            addPart={addPart}
            removePart={removePart}
            partBucket= {partBucket}
            setGraphData={(data)=>{
             setGraphData(data);
              setGraphVersion(graphVersion+1);
            }}
          />
          <PartCard
            focusedItem={focusedItem}
          />
          <GraphChart
            graphVersion={graphVersion}
            graphData={graphData}
            setFocusedItem={setFocusedItem}
            suggestedItems={suggestedItems}
          />
        </Content>
      </App>
    );
  //}

}

export default App;