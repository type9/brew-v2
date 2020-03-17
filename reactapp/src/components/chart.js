
import React, { useState, useEffect, useRef } from 'react';
import D3Graph from "./d3graph";

let visual = null;

function GraphChart(){
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(600);
    const [graphData, setData] = useState(null);
    const [active, setActive] = useState(null);
    const refElement = useRef(null);

    useEffect(fetchData, []);
    useEffect(initGraph, [ graphData ]);

    function fetchData(){
        fetch("/api/graph")
        .then(res => res.json())
        .then(
            (result) => {
                setData(result);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    function initGraph(){
        if(graphData){
            console.log("initializing graph with data: ");
            console.log(graphData);
            const d3props = {
                graphData,
                width,
                height
            };
            visual = new D3Graph(refElement.current, d3props);
        }
    }

    return (
        <div className="chart-container">
            <div>{active}</div>
            <div className = "graph-container" ref={refElement}/>
        </div>
    );
}
    
export default GraphChart;