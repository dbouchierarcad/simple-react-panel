import React,{Component} from "react";
// @ts-ignore
import Graph from "react-graph-vis";






var nodes1 = [];
var edges1 = null;

var LENGTH_MAIN = 350,
  LENGTH_SERVER = 150,
  LENGTH_SUB = 50,
  WIDTH_SCALE = 2,
  //GREEN = "green",
  RED = "#C5000B",
  //ORANGE = "orange",
  //GRAY = '#666666',
  GRAY = "gray",
  //BLACK = "#2B1B17";

// Called when the Visualization API is loaded.

  // Create a data table with nodes.
  nodes1 = [];
  // Create a data table with links.
  edges1 = [];

  nodes1.push({ id: 1, label: "192.168.0.1", group: "switch", value: 10 });
  nodes1.push({ id: 2, label: "192.168.0.2", group: "switch", value: 8 });
  nodes1.push({ id: 3, label: "192.168.0.3", group: "switch", value: 6 });
  edges1.push({
    from: 1,
    to: 2,
    length: LENGTH_MAIN,
    width: WIDTH_SCALE * 6,
    label: "0.71 mbps"
  });
  edges1.push({
    from: 1,
    to: 3,
    length: LENGTH_MAIN,
    width: WIDTH_SCALE * 4,
    label: "0.55 mbps"
  });

  // group around 2
  for (var i = 100; i <= 104; i++) {
    var value = 1;
    var width = WIDTH_SCALE * 2;
    var color = GRAY;
    var label = null;

    if (i === 103) {
      value = 5;
      width = 3;
    }
    if (i === 102) {
      color = RED;
      label = "error";
    }

    nodes1.push({
      id: i,
      label: "192.168.0." + i,
      group: "desktop",
      value: value
    });
    edges1.push({
      from: 2,
      to: i,
      length: LENGTH_SUB,
      color: color,
      fontColor: color,
      width: width,
      label: label
    });
  }
  nodes1.push({ id: 201, label: "192.168.0.201", group: "desktop", value: 1 });
  edges1.push({
    from: 2,
    to: 201,
    length: LENGTH_SUB,
    color: GRAY,
    width: WIDTH_SCALE
  });

  // group around 3
  nodes1.push({ id: 202, label: "192.168.0.202", group: "desktop", value: 4 });
  edges1.push({
    from: 3,
    to: 202,
    length: LENGTH_SUB,
    color: GRAY,
    width: WIDTH_SCALE * 2
  });
  for (var i = 230; i <= 231; i++) {
    nodes1.push({ id: i, label: "192.168.0." + i, group: "mobile", value: 2 });
    edges1.push({
      from: 3,
      to: i,
      length: LENGTH_SUB,
      color: GRAY,
      fontColor: GRAY,
      width: WIDTH_SCALE
    });
  }

  // group around 1
  nodes1.push({ id: 10, label: "192.168.0.10", group: "server", value: 10 });
  edges1.push({
    from: 1,
    to: 10,
    length: LENGTH_SERVER,
    color: GRAY,
    width: WIDTH_SCALE * 6,
    label: "0.92 mbps"
  });
  nodes1.push({ id: 11, label: "192.168.0.11", group: "server", value: 7 });
  edges1.push({
    from: 1,
    to: 11,
    length: LENGTH_SERVER,
    color: GRAY,
    width: WIDTH_SCALE * 3,
    label: "0.68 mbps"
  });
  nodes1.push({ id: 12, label: "192.168.0.12", group: "server", value: 3 });
  edges1.push({
    from: 1,
    to: 12,
    length: LENGTH_SERVER,
    color: GRAY,
    width: WIDTH_SCALE,
    label: "0.3 mbps"
  });

  nodes1.push({ id: 204, label: "Internet", group: "internet", value: 10 });
  edges1.push({
    from: 1,
    to: 204,
    length: 200,
    width: WIDTH_SCALE * 3,
    label: "0.63 mbps"
  });

  // legend  
  var x = -2000 / 2 + 50;
  var y = -10 / 2 + 50;
  var step = 70;
  nodes1.push({
    id: 1000,
    x: x,
    y: y,
    label: "Internet",
    group: "internet",
    value: 1,
    fixed: true,
    physics: false
  });
  nodes1.push({
    id: 1001,
    x: x,
    y: y + step,
    label: "Switch",
    group: "switch",
    value: 1,
    fixed: true,
    physics: false
  });
  nodes1.push({
    id: 1002,
    x: x,
    y: y + 2 * step,
    label: "Server",
    group: "server",
    value: 1,
    fixed: true,
    physics: false
  });
  nodes1.push({
    id: 1003,
    x: x,
    y: y + 3 * step,
    label: "Computer",
    group: "desktop",
    value: 1,
    fixed: true,
    physics: false
  });
  nodes1.push({
    id: 1004,
    x: x,
    y: y + 4 * step,
    label: "Smartphone",
    group: "mobile",
    value: 1,
    fixed: true,
    physics: false
  });


  var options2 = {
    nodes1: {
      scaling: {
        min: 16,
        max: 32
      }
    },
    edges1: {
      color: GRAY,
      smooth: false
    },
    physics: {
        barnesHut: { gravitationalConstant: -30000 },
        stabilization: { iterations: 2500 }
      },
    groups: {
      switch: {
        shape: "triangle",
        color: "#FF9900" // orange
      },
      desktop: {
        shape: "dot",
        color: "#2B7CE9" // blue
      },
      mobile: {
        shape: "dot",
        color: "#5A1E5C" // purple
      },
      server: {
        shape: "box",
        size:250,
        font: {'face': 'monospace',color:"#ffffff", 'align': 'left'},
        color: "#C5000B", // red
        shadow:{
            enabled:true,
            color:'rgba(0,0,0,0.5)',
            x:6,
            y:6 
           }
     },  
    
      internet: {
        shape: "square",
        color: "#109618" // green
      }
    }
  };
  var data = {
    nodes: nodes1,
    edges: edges1
  };


  class GraphVis extends Component {
  //function GraphVis() {
    state = {
        errorFound: false
    }

    componentDidCatch() {
        /* here is where the magic happens.
           code inside here is executed if an error
           itn thrown from children */
           console.log("erreur info=")
        this.setState({ errorFound: true })
        // do some other logics if needed
    }

render() {          


  return (    
    <main className="center">
      
      <p> copyright Damien Bouchier - 220 chemin des clots 07170 Lavilledieu	</p>          
      <h1>Graph 2</h1>
      <Graph graph={data} options={options2} style={{ height: "440px", background:'#ffffff'}} />
    <div id="mynetwork"></div>
    </main>  
 )
}
/*    */
}

export default GraphVis