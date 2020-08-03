import React, { useState, useEffect, useRef} from 'react';
import D3Graph from "./d3graph";
import Suggested from "./suggested";
import PartCard from "./partcard";

let visual = null;

function GraphChart(props) {
    const refElement = useRef(null);
    const [width, setWidth] = useState(window.innerWidth - 312);
    const [height, setHeight] = useState(window.innerHeight - 60);

    const [graphData, setGraphData] = useState(null);
    const [graphVersion, setGraphVersion] = useState(0);
    const [focusedItem, setFocusedItem] = useState(null);
    const [suggestedItems, setSuggestedItems] = useState([]);

    useEffect(updateGraphData, []);
    useEffect(handleResizeEvent, []);
    useEffect(updateVisualOnResize, [ width, height ]);
    

    function getWidth(){
        return window.innerWidth - 312;
    }
    function getHeight(){
        return window.innerHeight - 60;
    }

    // useEffect(()=>{
    //     fetch("/api/graph")
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             setGraphData(result);
    //             setGraphVersion(graphVersion + 1);
    //         },
    //         (error) => {
    //             console.log(error);
    //         });
    // },[]);

    function initVisual(graphData, setFocusedItem){
        if(graphData){
            graphData = graphData;
            setFocusedItem = setFocusedItem;
            const d3props = {
                graphData,
                width,
                height,
                setFocusedItem,
            };
            console.log("new chart")
            visual = new D3Graph(refElement.current, d3props);
        }
    }
    
    function updateGraphData(){
        if(props.partBucket.length === 0){
          return undefined;
        }
        let nodes = new Set();
        props.partBucket.map(part => { // merged all parts in the bucket into one big union (therefore no duplicates)
          nodes = part.union(nodes);
        });
        let data = {nodes: Array.from(nodes)}; // puts into dictionary format
        fetch('/api/subgraph', {
          method: "POST",
          body: JSON.stringify(data)
        })
        .then((response) => { return response.json(); })
        .then(data => initVisual(data, setFocusedItem));
    
        fetch('/api/similarity', { //updates suggested items as well
          method: "POST",
          body: JSON.stringify(data)
        })
        .then((response) => { return response.json(); })
        .then((data) => {
          setSuggestedItems(data);
        })
    }

    function handleResizeEvent() {
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setWidth(getWidth());
                setHeight(getHeight());

            }, 300);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }

    function updateVisualOnResize() {
        visual && visual.resize(width, height);
    }

    return (
        <div className="chart-container">
            <Suggested
                suggestedItems={suggestedItems}
            />
            <PartCard
                focusedItem={focusedItem}
            />
            <div
                id="graph-container"
                ref={refElement}
            />
        </div>
    );
}

export default GraphChart;