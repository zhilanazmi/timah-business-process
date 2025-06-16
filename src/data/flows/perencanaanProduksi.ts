import { FlowData } from './types';
import { Node, Edge, MarkerType } from 'reactflow';

// Parse the exported flow data
const exportedFlowData = {
    "nodes": [
      {
        "width": 169,
        "height": 55,
        "id": "1",
        "type": "terminatorNode",
        "position": {
          "x": 573.721433796635,
          "y": 71.6035844915874
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
          "x": 573.721433796635,
          "y": 71.6035844915874
        },
        "dragging": false
      },
      {
        "width": 169,
        "height": 55,
        "id": "10",
        "type": "terminatorNode",
        "position": {
          "x": 289.465719546137,
          "y": 1109.63312318113
        },
        "data": {
          "label": "End",
          "description": "",
          "column": "pelanggan",
          "details": {
            "Process Owner": "",
            "Duration": "N/A",
            "Input": "Delivered products",
            "Output": "Customer feedback"
          }
        },
        "selected": false,
        "positionAbsolute": {
          "x": 289.465719546137,
          "y": 1109.63312318113
        },
        "dragging": false
      },
      {
        "width": 180,
        "height": 40,
        "id": "header-kolomsatu",
        "type": "customNode",
        "position": {
          "x": 10,
          "y": 10
        },
        "data": {
          "label": "QPP Manager",
          "isHeader": true,
          "column": "kolomsatu",
          "color": "bg-blue-900"
        },
        "draggable": false,
        "positionAbsolute": {
          "x": 10,
          "y": 10
        }
      },
      {
        "width": 180,
        "height": 40,
        "id": "header-kolomdua",
        "type": "customNode",
        "position": {
          "x": 290,
          "y": 10
        },
        "data": {
          "label": "PP Supervisor",
          "isHeader": true,
          "column": "kolomdua",
          "color": "bg-blue-900"
        },
        "draggable": false,
        "positionAbsolute": {
          "x": 290,
          "y": 10
        }
      },
      {
        "width": 180,
        "height": 40,
        "id": "header-kolomtiga",
        "type": "customNode",
        "position": {
          "x": 570,
          "y": 10
        },
        "data": {
          "label": "Sales",
          "isHeader": true,
          "column": "kolomtiga",
          "color": "from-green-800 to-green-900"
        },
        "draggable": false,
        "positionAbsolute": {
          "x": 570,
          "y": 10
        },
        "selected": true
      },
      {
        "width": 180,
        "height": 40,
        "id": "header-kolomempat",
        "type": "customNode",
        "position": {
          "x": 850,
          "y": 10
        },
        "data": {
          "label": "Lab Supervisor",
          "isHeader": true,
          "column": "kolomempat",
          "color": "bg-blue-900"
        },
        "draggable": false,
        "positionAbsolute": {
          "x": 850,
          "y": 10
        }
      },
      {
        "width": 180,
        "height": 64,
        "id": "header-kolomlima",
        "type": "customNode",
        "position": {
          "x": 1130,
          "y": 10
        },
        "data": {
          "label": "Warehouse Supervisor",
          "isHeader": true,
          "column": "kolomlima",
          "color": "bg-blue-900"
        },
        "draggable": false,
        "positionAbsolute": {
          "x": 1130,
          "y": 10
        }
      },
      {
        "width": 180,
        "height": 95,
        "id": "node-1744269537426",
        "type": "documentNode",
        "position": {
          "x": 568.129821540917,
          "y": 166.99655389746
        },
        "data": {
          "label": "Booking Note",
          "description": "",
          "column": "kolomtiga",
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
          "x": 568.129821540917,
          "y": 166.99655389746
        },
        "dragging": false
      },
      {
        "width": 180,
        "height": 95,
        "id": "node-1744269566708",
        "type": "documentNode",
        "position": {
          "x": 285.793123628383,
          "y": 167.310021945867
        },
        "data": {
          "label": "Booking Note",
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
        "positionAbsolute": {
          "x": 285.793123628383,
          "y": 167.310021945867
        },
        "dragging": false
      },
      {
        "width": 180,
        "height": 95,
        "id": "node-1744269586628",
        "type": "documentNode",
        "position": {
          "x": 285.793123628383,
          "y": 291.516898317484
        },
        "data": {
          "label": "Draft MPS",
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
        "positionAbsolute": {
          "x": 285.793123628383,
          "y": 291.516898317484
        },
        "dragging": false
      },
      {
        "width": 150,
        "height": 100,
        "id": "node-1744269602427",
        "type": "diamondNode",
        "position": {
          "x": 8.94828090709582,
          "y": 398.688222384784
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
          "x": 8.94828090709582,
          "y": 398.688222384784
        },
        "dragging": false
      },
      {
        "width": 175,
        "height": 51,
        "id": "node-1744269635062",
        "type": "customNode",
        "position": {
          "x": 286.382979641185,
          "y": 476.620507809243
        },
        "data": {
          "label": "Monitoring rencana forecast pemasaran dan aktual stock di gudang",
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
          "width": 175,
          "height": 51
        },
        "resizing": false,
        "positionAbsolute": {
          "x": 286.382979641185,
          "y": 476.620507809243
        }
      },
      {
        "width": 148,
        "height": 51,
        "id": "node-1744269664969",
        "type": "customNode",
        "position": {
          "x": 860.880372484498,
          "y": 506.538099251055
        },
        "data": {
          "label": "Input Master BOM",
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
          "x": 860.880372484498,
          "y": 506.538099251055
        },
        "dragging": false
      },
      {
        "width": 171,
        "height": 51,
        "id": "node-1744269693641",
        "type": "customNode",
        "position": {
          "x": 286.498257234617,
          "y": 678.408297495483
        },
        "data": {
          "label": "Membuat Perencanaan PRO",
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
          "width": 171,
          "height": 51
        },
        "resizing": false,
        "positionAbsolute": {
          "x": 286.498257234617,
          "y": 678.408297495483
        }
      },
      {
        "width": 180,
        "height": 95,
        "id": "node-1744269725667",
        "type": "documentNode",
        "position": {
          "x": 281.825196353971,
          "y": 800.552940910818
        },
        "data": {
          "label": "PRO",
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
        "positionAbsolute": {
          "x": 281.825196353971,
          "y": 800.552940910818
        },
        "dragging": false
      },
      {
        "width": 150,
        "height": 100,
        "id": "node-1744269740664",
        "type": "diamondNode",
        "position": {
          "x": 5.25456223849561,
          "y": 869.726105682937
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
          "x": 5.25456223849561,
          "y": 869.726105682937
        },
        "dragging": false
      },
      {
        "width": 180,
        "height": 95,
        "id": "node-1744269793540",
        "type": "documentNode",
        "position": {
          "x": 284.209918760539,
          "y": 966.368016583824
        },
        "data": {
          "label": "PRO Dikirimkan ke SPV Tin Intermediate, Stabilizer, dan Solder",
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
        "positionAbsolute": {
          "x": 284.209918760539,
          "y": 966.368016583824
        },
        "dragging": false
      },
      {
        "width": 180,
        "height": 95,
        "id": "node-1744269831748",
        "type": "documentNode",
        "position": {
          "x": 1125.94752030987,
          "y": 291.591706028687
        },
        "data": {
          "label": "Laporan Stock Bahan",
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
          "x": 1125.94752030987,
          "y": 291.591706028687
        },
        "dragging": false
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
        "id": "enode-1744269566708-node-1744269586628-1744269862561",
        "source": "node-1744269566708",
        "target": "node-1744269586628",
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
        "id": "enode-1744269586628-node-1744269602427-1744269877449",
        "source": "node-1744269586628",
        "target": "node-1744269602427",
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
        "id": "enode-1744269602427-node-1744269586628-1744269881253",
        "source": "node-1744269602427",
        "target": "node-1744269586628",
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
        "id": "enode-1744269602427-node-1744269635062-1744269896564",
        "source": "node-1744269602427",
        "target": "node-1744269635062",
        "sourceHandle": "bottom-source",
        "targetHandle": "left"
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
        "id": "enode-1744269635062-node-1744269664969-1744269916784",
        "source": "node-1744269635062",
        "target": "node-1744269664969",
        "sourceHandle": "right",
        "targetHandle": "left"
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
        "id": "enode-1744269664969-node-1744269693641-1744269964466",
        "source": "node-1744269664969",
        "target": "node-1744269693641",
        "sourceHandle": "bottom",
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
        "id": "enode-1744269740664-node-1744269793540-1744270045939",
        "source": "node-1744269740664",
        "target": "node-1744269793540",
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
        "id": "enode-1744269793540-10-1744270050661",
        "source": "node-1744269793540",
        "target": "10",
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
        "id": "enode-1744269831748-node-1744269586628-1744270226222",
        "source": "node-1744269831748",
        "target": "node-1744269586628",
        "sourceHandle": "left-source",
        "targetHandle": "right-target"
      }
    ],
    "viewport": {
      "x": 227.741444673532,
      "y": -10.1861962109273,
      "zoom": 0.726063964751788
    }
  }

// Define columns based on the header nodes
const columns = [
  { id: 'kolomsatu', title: 'QPP Manager', color: 'bg-blue-900' },
  { id: 'kolomdua', title: 'PP Supervisor', color: 'bg-blue-900' },
  { id: 'kolomtiga', title: 'Sales Admin', color: 'bg-blue-900' },
  { id: 'kolomempat', title: 'Lab Supervisor', color: 'bg-blue-900' },
  { id: 'kolomlima', title: 'Warehouse Supervisor', color: 'bg-blue-900' }
];

// Extract process nodes (non-header nodes)
const processNodes = exportedFlowData.nodes.filter(node => 
  !node.data.isHeader
);

// Convert edges to proper Edge type
const processEdges: Edge[] = exportedFlowData.edges.map(edge => ({
  id: edge.id,
  source: edge.source,
  target: edge.target,
  sourceHandle: edge.sourceHandle,
  targetHandle: edge.targetHandle,
  type: edge.type,
  animated: edge.animated,
  style: edge.style,
  data: edge.data,
  markerEnd: {
    type: MarkerType.ArrowClosed
  }
}));

const perencanaanProduksiFlow: FlowData = {
  id: 'perencanaan-produksi',
  title: 'Perencanaan Produksi',
  description: 'Alur proses perencanaan produksi barang',
  initialColumns: columns,
  defaultPages: [
    {
      id: 'page-1',
      title: 'Alur Utama',
      nodes: processNodes as Node[],
      edges: processEdges
    }
  ]
};

export default perencanaanProduksiFlow; 