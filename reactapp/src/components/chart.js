
import React, { useState, useEffect, useRef } from 'react';
import D3Graph from "./d3graph";

let visual = null;

function GraphChart(){
    const refElement = useRef(null);
    const [width, setWidth] = useState(window.innerWidth * 0.8);
    const [height, setHeight] = useState(window.innerHeight - 60);
    const [graphData, setData] = useState(null);
    const [active, setActive] = useState(null);

    useEffect(fetchData, []);
    useEffect(handleResizeEvent, []);
    useEffect(initGraph, [ graphData ]);
    useEffect(updateVisualOnResize, [ width, height ]);

    function getWidth(){
        return window.innerWidth * 0.8;
    }
    function getHeight(){
        return window.innerHeight - 60;
    }

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
            <div>{active}</div>
            <div id = "graph-container" ref={refElement}/>
        </div>
    );
}
    
export default GraphChart;