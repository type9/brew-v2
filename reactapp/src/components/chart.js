import React, {Component} from "React";

import styled from "styled-components";
import * as d3 from "d3";

class GraphChart extends Component{
    constructor(props){
        super(props);
        this.createGraphChart = this.createGraphChart.bind(this);
        this.data = null;
        this.height = 600;
        this.width = 600;
        this.simulation = null;
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
                this.data = this.props.graphData;
            },
            (error) => {
                this.setState({
                    graphLoaded: false,
                    error
                });
            }
        )
    }
    componentDidUpdate(){
        if(this.props.graphData !== prevProps.graphData){
            createGRaphChart(this.props.graphData, this.height, this.width)
        }
    }

    createGraphChart(data, height, width){
        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));
      
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("x", d3.forceX())
            .force("y", d3.forceY());
      
        const svg = d3.create("svg")
            .attr("viewBox", [-width / 2, -height / 2, width, height]); //UNDEF
      
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));
      
        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(nodes)
          .join("circle")
            .attr("r", 5)
            // .attr("fill", color)
            // .call(drag(simulation));
      
        node.append("title")
            .text(d => d.id);
      
        simulation.on("tick", () => {
          link
              .attr("x1", d => d.source.x)
              .attr("y1", d => d.source.y)
              .attr("x2", d => d.target.x)
              .attr("y2", d => d.target.y);
      
          node
              .attr("cx", d => d.x)
              .attr("cy", d => d.y);
        });
      
        // invalidation.then(() => simulation.stop());
      
        return svg.node();
    }

    // drag = simulation => {
  
    //     function dragstarted(d) {
    //       if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    //       d.fx = d.x;
    //       d.fy = d.y;
    //     }
        
    //     function dragged(d) {
    //       d.fx = d3.event.x;
    //       d.fy = d3.event.y;
    //     }
        
    //     function dragended(d) {
    //       if (!d3.event.active) simulation.alphaTarget(0);
    //       d.fx = null;
    //       d.fy = null;
    //     }r
        
    //     return d3.drag()
    //         .on("start", dragstarted)
    //         .on("drag", dragged)
    //         .on("end", dragended);
    // }
    render(){
        //STYLE
        const Chart = styled.div`
        `;
        //SIM setup
        if(this.props.graphLoaded == true){
            console.log('Graph data loaded')
            this.simulation = this.createGraphChart(this.data, 600 , 600)
        } else {
            console.log('Graph data not loaded')
        }
        return(
            <Chart>
                {this.simulation}
            </Chart>
        );
    }
}

export default GraphChart;