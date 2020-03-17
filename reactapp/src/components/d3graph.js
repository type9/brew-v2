import * as d3 from "d3";
const DEBUG = true;

class D3Graph {
    container;
    props;
    svg;

    constructor(container, props){
        this.container = container;
        this.props = props;
        const { width, height } = props;

        this.links = null;
        this.nodes = null;
        this.simulation = null;
        this.link = null;
        this.node = null;



        this.svg = d3.create("svg")
            .attr("viewBox", [-width / 2, -height / 2, width, height]);

        this.updateLinksNodes();
        this.updateSimulation();
        this.updateLinkStyle();
        this.updateNodeStyle();
        this.simulation.on("tick", this.tick());

        console.log("[D3Graph] Rendering to " + container);
        // d3.select(container).append(this.svg);
        d3.select(container)
            .append(() => {
                return this.svg.node();
            });
    }

    updateLinksNodes = () => {
        const {props: { graphData: { links, nodes } } } = this;
        this.links = links.map(d => Object.create(d));
        this.nodes = nodes.map(d => Object.create(d));
        console.log("[D3Graph] Updated Nodes/Links");
    }

    updateSimulation = () => {
        this.simulation = d3.forceSimulation(this.nodes)
            .force("link", d3.forceLink(this.links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("x", d3.forceX())
            .force("y", d3.forceY());
        console.log("[D3Graph] Updated Simulation");
    }

    updateLinkStyle = () => {
        this.link = this.svg.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(this.links)
            .join("line")
                .attr("stroke-width", d => Math.sqrt(d.value));
        console.log("[D3Graph] Updated LinkStyle");
        
    }

    updateNodeStyle = () => {
        this.node = this.svg.append("g")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(this.nodes)
            .join("circle")
                .attr("r", 5)
        
        this.node.append("title")
            .text(d => d.id);
        
        console.log("[D3Graph] Updated NodeStyle");
    }

    tick = () => {
        this.link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        this.node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        
        console.log("[D3Graph] Declared tick function");
    }
}

export default D3Graph;