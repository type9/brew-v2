import React, { useState, useEffect, useRef} from 'react';
import D3Graph from "./d3graph";
import Suggested from "./suggested";
import styled from "styled-components";
import { onlyUpdateForKeys } from 'recompose';

let visual = null;

const areEqual = (prevProps, nextProps) => {
    console.log(`${prevProps.graphVersion} -> ${nextProps.graphVersion} = ${prevProps.graphVersion === nextProps.graphVersion}`)
    return prevProps.graphVersion === nextProps.graphVersion;
}

function GraphChart(props) {
    console.log("rendered Chart", props.graphVersion);
    //console.log(props);
    const refElement = useRef(null);
    const [width, setWidth] = useState(window.innerWidth - 312);
    const [height, setHeight] = useState(window.innerHeight - 60);

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
        let setFocusedItem = props.setFocusedItem;
        if(graphData){
            const d3props = {
                graphData,
                width,
                height,
                setFocusedItem,
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
            <Suggested
                suggestedItems={props.suggestedItems}
            />
            <div
                id="graph-container"
                ref={refElement}
            />
        </div>
    );
}

export default onlyUpdateForKeys(['graphVersion'])(GraphChart);