import { FlowData } from './types';
import { Node } from 'reactflow';

// Parse the exported flow data - using similar structure but with different column headers for Analisa Sampel Non Rutin
const exportedFlowData = {
  "nodes": [
    {
      "width": 230,
      "height": 97,
      "id": "1",
      "type": "terminatorNode",
      "position": {
        "x": 1141.23084261139,
        "y": 69.8320878603428
      },
      "data": {
        "label": "Start",
        "description": "",
        "column": "pelanggan",
        "details": {
          "Process Owner": "",
          "Duration": "1-2 days",
          "Input": "Product requirements",
          "Output": "Order form"
        }
      },
      "selected": false,
      "positionAbsolute": {
        "x": 1141.23084261139,
        "y": 69.8320878603428
      },
      "dragging": false,
      "style": {
        "width": 230,
        "height": 97
      },
      "resizing": false
    },
    {
      "width": 218,
      "height": 95,
      "id": "node-1744269537426",
      "type": "documentNode",
      "position": {
        "x": 1116.19529142652,
        "y": 168.321342552479
      },
      "data": {
        "label": "Form Request Sample Analysis",
        "description": "",
        "column": "kolomtiga",
        "link": "",
        "details": {
          "Process Owner": "",
          "Duration": "",
          "Input": "",
          "Output": ""
        },
        "width": 218,
        "height": 95
      },
      "selected": false,
      "positionAbsolute": {
        "x": 1116.19529142652,
        "y": 168.321342552479
      },
      "dragging": false,
      "style": {
        "width": 218,
        "height": 95
      },
      "resizing": false
    },
    {
      "width": 757,
      "height": 95,
      "id": "node-1744269566708",
      "type": "documentNode",
      "position": {
        "x": 5.79312362838334,
        "y": 167.310021945867
      },
      "data": {
        "label": "Form Request Sample Analysis",
        "description": "",
        "column": "kolomdua",
        "link": "",
        "details": {
          "Process Owner": "",
          "Duration": "",
          "Input": "",
          "Output": ""
        },
        "width": 757,
        "height": 95
      },
      "selected": false,
      "positionAbsolute": {
        "x": 5.79312362838334,
        "y": 167.310021945867
      },
      "dragging": false,
      "style": {
        "width": 757,
        "height": 95
      },
      "resizing": false
    },
    {
      "width": 150,
      "height": 100,
      "id": "node-1744269602427",
      "type": "diamondNode",
      "position": {
        "x": 3.32567699400752,
        "y": 385.568813254245
      },
      "data": {
        "label": "Kaji Ulang",
        "description": "",
        "column": "kolomsatu",
        "link": "",
        "details": {
          "Process Owner": "",
          "Duration": "",
          "Input": "",
          "Output": ""
        }
      },
      "selected": false,
      "positionAbsolute": {
        "x": 3.32567699400752,
        "y": 385.568813254245
      },
      "dragging": false
    },
    {
      "width": 604,
      "height": 51,
      "id": "node-1744269693641",
      "type": "customNode",
      "position": {
        "x": 70.1719776684878,
        "y": 586.572433581708
      },
      "data": {
        "label": "Analisa Sampel Khusus",
        "description": "",
        "column": "kolomdua",
        "link": "",
        "details": {
          "Process Owner": "",
          "Duration": "",
          "Input": "",
          "Output": ""
        }
      },
      "selected": false,
      "dragging": false,
      "style": {
        "width": 604,
        "height": 51
      },
      "resizing": false,
      "positionAbsolute": {
        "x": 70.1719776684878,
        "y": 586.572433581708
      }
    },
    {
      "width": 228,
      "height": 95,
      "id": "node-1744269725667",
      "type": "documentNode",
      "position": {
        "x": 541.199850129175,
        "y": 753.697908301749
      },
      "data": {
        "label": "Hasil Analisa Sampel Khusus",
        "description": "",
        "column": "kolomdua",
        "link": "",
        "details": {
          "Process Owner": "",
          "Duration": "",
          "Input": "",
          "Output": ""
        },
        "width": 228,
        "height": 95
      },
      "selected": false,
      "positionAbsolute": {
        "x": 541.199850129175,
        "y": 753.697908301749
      },
      "dragging": false,
      "style": {
        "width": 228,
        "height": 95
      },
      "resizing": false
    },
    {
      "width": 150,
      "height": 100,
      "id": "node-1744269740664",
      "type": "diamondNode",
      "position": {
        "x": 7.80495668728926,
        "y": 969.191489185889
      },
      "data": {
        "label": "Verifikasi",
        "description": "",
        "column": "kolomsatu",
        "link": "",
        "details": {
          "Process Owner": "",
          "Duration": "",
          "Input": "",
          "Output": ""
        }
      },
      "selected": false,
      "positionAbsolute": {
        "x": 7.80495668728926,
        "y": 969.191489185889
      },
      "dragging": false
    },
    {
      "width": 218,
      "height": 95,
      "id": "node-1744269793540",
      "type": "documentNode",
      "position": {
        "x": 845.104606294069,
        "y": 896.895392679305
      },
      "data": {
        "label": "Form Analysis Request Report",
        "description": "",
        "column": "kolomdua",
        "link": "",
        "details": {
          "Process Owner": "",
          "Duration": "",
          "Input": "",
          "Output": ""
        },
        "width": 218,
        "height": 95
      },
      "selected": false,
      "positionAbsolute": {
        "x": 845.104606294069,
        "y": 896.895392679305
      },
      "dragging": false,
      "style": {
        "width": 218,
        "height": 95
      },
      "resizing": false
    },
    {
      "width": 180,
      "height": 40,
      "id": "header-kolomsatu-page-1",
      "type": "customNode",
      "position": {
        "x": 10,
        "y": 10
      },
      "data": {
        "label": "Lab Supervisor",
        "isHeader": true,
        "column": "kolomsatu",
        "color": "#3b82f6"
      },
      "draggable": false,
      "style": {

      },
      "positionAbsolute": {
        "x": 10,
        "y": 10
      },
      "selected": false
    },
    {
      "width": 180,
      "height": 40,
      "id": "header-kolomdua-page-1",
      "type": "customNode",
      "position": {
        "x": 290,
        "y": 10
      },
      "data": {
        "label": "Lab Foreman",
        "isHeader": true,
        "column": "kolomdua",
        "color": "#3b82f6"
      },
      "draggable": false,
      "style": {

      },
      "positionAbsolute": {
        "x": 290,
        "y": 10
      },
      "selected": false
    },
    {
      "width": 180,
      "height": 40,
      "id": "header-kolomtiga-page-1",
      "type": "customNode",
      "position": {
        "x": 570,
        "y": 10
      },
      "data": {
        "label": "Lab Operator",
        "isHeader": true,
        "column": "kolomtiga",
        "color": "#3b82f6"
      },
      "draggable": false,
      "style": {

      },
      "positionAbsolute": {
        "x": 570,
        "y": 10
      },
      "selected": false
    },
    {
      "width": 180,
      "height": 40,
      "id": "header-kolomempat-page-1",
      "type": "customNode",
      "position": {
        "x": 850,
        "y": 10
      },
      "data": {
        "label": "Lab Admin",
        "isHeader": true,
        "column": "kolomempat",
        "color": "#3b82f6"
      },
      "draggable": false,
      "style": {

      },
      "positionAbsolute": {
        "x": 850,
        "y": 10
      },
      "selected": false
    },
    {
      "width": 180,
      "height": 40,
      "id": "header-kolomlima-page-1",
      "type": "customNode",
      "position": {
        "x": 1130,
        "y": 10
      },
      "data": {
        "label": "User",
        "isHeader": true,
        "column": "kolomlima",
        "color": "#3b82f6"
      },
      "draggable": false,
      "style": {

      },
      "positionAbsolute": {
        "x": 1130,
        "y": 10
      },
      "selected": false
    },
    {
      "width": 180,
      "height": 95,
      "id": "node-1747295387900",
      "type": "documentNode",
      "position": {
        "x": 1170.8063111807,
        "y": 1129.48035539775
      },
      "data": {
        "label": "Analysis Request Report",
        "description": "",
        "column": "kolomlima",
        "link": "",
        "details": {
          "Process Owner": "",
          "Duration": "",
          "Input": "",
          "Output": ""
        }
      },
      "selected": false,
      "positionAbsolute": {
        "x": 1170.8063111807,
        "y": 1129.48035539775
      },
      "dragging": false
    },
    {
      "width": 169,
      "height": 55,
      "id": "node-1747295487481",
      "type": "terminatorNode",
      "position": {
        "x": 1176.19660417008,
        "y": 1353.19638535666
      },
      "data": {
        "label": "END",
        "description": "",
        "column": "kolomlima",
        "link": "",
        "details": {
          "Process Owner": "",
          "Duration": "",
          "Input": "",
          "Output": ""
        }
      },
      "selected": false,
      "positionAbsolute": {
        "x": 1176.19660417008,
        "y": 1353.19638535666
      },
      "dragging": false
    },
    {
      "width": 169,
      "height": 80,
      "id": "node-1747295514957",
      "type": "customNode",
      "position": {
        "x": 900.225326184655,
        "y": 1293.85195480969
      },
      "data": {
        "label": "Sampel Khusus",
        "description": "",
        "column": "kolomempat",
        "link": "",
        "details": {
          "Process Owner": "",
          "Duration": "",
          "Input": "",
          "Output": ""
        }
      },
      "selected": false,
      "positionAbsolute": {
        "x": 900.225326184655,
        "y": 1293.85195480969
      },
      "dragging": false,
      "style": {
        "width": 169,
        "height": 80
      },
      "resizing": false
    }
  ],
  "edges": [
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "e1-node-1744269537426-1744269839437",
      "source": "1",
      "target": "node-1744269537426",
      "sourceHandle": "bottom-source",
      "targetHandle": "top-target"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1744269537426-node-1744269566708-1744269856711",
      "source": "node-1744269537426",
      "target": "node-1744269566708",
      "sourceHandle": "left-source",
      "targetHandle": "right-target"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1744269693641-node-1744269725667-1744269983168",
      "source": "node-1744269693641",
      "target": "node-1744269725667",
      "sourceHandle": "bottom",
      "targetHandle": "top-target"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1744269725667-node-1744269740664-1744270025677",
      "source": "node-1744269725667",
      "target": "node-1744269740664",
      "sourceHandle": "left-source",
      "targetHandle": "top-target"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1744269566708-node-1744269602427-1747294821650",
      "source": "node-1744269566708",
      "target": "node-1744269602427",
      "sourceHandle": "bottom-source",
      "targetHandle": "top-target"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1744269602427-node-1744269693641-1747295089768",
      "source": "node-1744269602427",
      "target": "node-1744269693641",
      "sourceHandle": "bottom-source",
      "targetHandle": "top"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1744269602427-node-1744269537426-1747295097759",
      "source": "node-1744269602427",
      "target": "node-1744269537426",
      "sourceHandle": "right-source",
      "targetHandle": "bottom-target"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1744269725667-node-1744269793540-1747295309884",
      "source": "node-1744269725667",
      "target": "node-1744269793540",
      "sourceHandle": "bottom-source",
      "targetHandle": "top-target"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1744269793540-node-1744269740664-1747295338971",
      "source": "node-1744269793540",
      "target": "node-1744269740664",
      "sourceHandle": "left-source",
      "targetHandle": "top-target"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1744269740664-node-1747295387900-1747295402395",
      "source": "node-1744269740664",
      "target": "node-1747295387900",
      "sourceHandle": "bottom-source",
      "targetHandle": "left-target"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1744269740664-node-1744269693641-1747295465438",
      "source": "node-1744269740664",
      "target": "node-1744269693641",
      "sourceHandle": "right-source",
      "targetHandle": "top"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1747295514957-node-1747295487481-1747295553029",
      "source": "node-1747295514957",
      "target": "node-1747295487481",
      "sourceHandle": "right",
      "targetHandle": "top-target"
    },
    {
      "type": "smoothstep",
      "animated": true,
      "style": {
        "strokeWidth": 2,
        "stroke": "#555"
      },
      "data": {
        "label": "Hubungan"
      },
      "markerEnd": {
        "type": "arrowclosed",
        "width": 20,
        "height": 20,
        "color": "#555"
      },
      "id": "enode-1747295387900-node-1747295487481-1747295556835",
      "source": "node-1747295387900",
      "target": "node-1747295487481",
      "sourceHandle": "bottom-source",
      "targetHandle": "top-target"
    }
  ],
  "viewport": {
    "x": 343.767783354692,
    "y": 11.1679216392844,
    "zoom": 0.457391621449459
  }
}

// Define columns based on the header nodes
const columns = [
  { id: 'kolomsatu', title: 'Lab Supervisor', color: 'bg-blue-900' },
  { id: 'kolomdua', title: 'Lab Foreman', color: 'bg-blue-900' },
  { id: 'kolomtiga', title: 'Lab Operator', color: 'bg-blue-900' },
  { id: 'kolomempat', title: 'Lab Admin', color: 'bg-blue-900' },
  { id: 'kolomlima', title: 'User', color: 'bg-blue-900' }
];

// Extract process nodes (non-header nodes)
const processNodes = exportedFlowData.nodes.filter(node => 
  !node.data.isHeader
);

const analisaSampelNonRutinFlow: FlowData = {
  id: 'analisa-sampel-non-rutin',
  title: 'Analisa Sampel Non Rutin',
  description: 'Alur proses analisa sampel non rutin',
  initialColumns: columns,
  defaultPages: [
    {
      id: 'page-1',
      title: 'Alur Utama',
      nodes: processNodes as Node[],
      edges: exportedFlowData.edges
    }
  ]
};

export default analisaSampelNonRutinFlow; 