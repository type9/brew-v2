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

        this.drag = simulation => {
  
            function dragstarted(d) {
              if (!d3.event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            }
            
            function dragged(d) {
              d.fx = d3.event.x;
              d.fy = d3.event.y;
            }
            
            function dragended(d) {
              if (!d3.event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }
            
            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        this.color = (d) => {
            const scale = d3.scaleOrdinal(d3.schemeCategory10);
            return d => scale(d.group);
        }

        console.log("[D3Graph] Rendering to " + container);
        d3.select(container)
            .append(() => {
                return this.graph(width, height);
            });
    }

    graph = (width, height) => {
        const {props: { graphData } } = this;
        const links = graphData.links.map(d => Object.create(d));
        const nodes = graphData.nodes.map(d => Object.create(d));
        
        const svg = d3.create("svg")
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .style("font", "12px sans-serif");
      
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.weight * 50))
            .force("charge", d3.forceManyBody())
            .force("x", d3.forceX())
            .force("y", d3.forceY());
      
        const link = svg.append("g")
            .attr("class", "links")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
            .attr("stroke-width", d => (1/d.weight )* 3);
      
        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(nodes)
          .join("circle")
            .attr("r", 5)
            .attr("fill", d => this.color(d))
            .call(this.drag(simulation));

        var text = svg.append("g")
            .attr("class", "labels")
          .selectAll("text")
            .data(nodes)
          .enter().append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(d => d.id);

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

          text
              .attr("dx", d => d.x + 10)
              .attr("dy", d => d.y + 5);
        });
        
        //add zoom capabilities 
        // var zoom_handler = d3.zoom()
        //     .on("zoom", zoom_actions);

        // zoom_handler(svg);

        // function zoom_actions(){
        //     svg.attr("transform", d3.event.transform)
        // }

        return svg.node();
    }

    resize = (width, height) => {
        d3.select(this.container).select("svg").remove();
        d3.select(this.container)
            .append(() => {
                return this.graph(width, height);
            });
    }
}

export default D3Graph;