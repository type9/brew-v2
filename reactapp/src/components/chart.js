import React, { useState, useEffect, useRef } from 'react';
import D3Graph from "./d3graph";

let visual = null;

function GraphChart(props){
    console.log(props);
    const refElement = useRef(null);
    const [width, setWidth] = useState(window.innerWidth - 312);
    const [height, setHeight] = useState(window.innerHeight - 60);

    // useEffect(fetchData, []);
    useEffect(handleResizeEvent, []);
    useEffect(initGraph, []);
    useEffect(updateVisualOnResize, [ width, height ]);

    function getWidth(){
        return window.innerWidth - 312;
    }
    function getHeight(){
        return window.innerHeight - 60;
    }

    function initGraph(){
        let graphData = props.graphData;
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
            <div id = "graph-container" ref={refElement}/>
        </div>
    );
}
    
export default GraphChart;