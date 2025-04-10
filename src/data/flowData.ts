
import { Node, Edge, MarkerType } from 'reactflow';

const columnWidth = 200;
const nodeWidth = 180;
const gap = 80;

// Define columns
export const columns = [
  { id: 'kolomsatu', title: 'QPP Manager', color: 'bg-blue-900' },
  { id: 'kolomdua', title: 'PP Supervisor', color: 'bg-blue-900' },
  { id: 'kolomtiga', title: 'Sales Admin', color: 'bg-blue-900' },
  { id: 'kolomempat', title: 'Lab Supervisor', color: 'bg-blue-900' },
  { id: 'kolomlima', title: 'Warehouse Supervisor', color: 'bg-blue-900' },
];

// Calculate x position based on column index
const getColumnX = (columnIndex: number) => columnIndex * (columnWidth + gap) + (columnWidth - nodeWidth) / 2;

// Initial nodes for the first page
export const initialNodes: Node[] = [
  // Pelanggan column
  {
    id: '1',
    type: 'terminatorNode',
    position: { x: getColumnX(0), y: 100 },
    data: { 
      label: 'Start',
      description: '',
      column: 'pelanggan',
      details: {
        'Process Owner': '',
        'Duration': '1-2 days',
        'Input': 'Product requirements',
        'Output': 'Order form'
      }
    }
  },
  
  // Pemasaran column
  {
    id: '2',
    type: 'customNode',
    position: { x: getColumnX(1), y: 100 },
    data: { 
      label: 'Kontrak Penjualan',
      description: 'Descriptionnya apa',
      column: 'pemasaran',
      details: {
        'Process Owner': '',
        'Duration': '1 day',
        'Input': 'Order form',
        'Output': 'Validated order'
      }
    }
  },
  {
    id: '3',
    type: 'diamondNode',
    position: { x: getColumnX(2), y: 300 },
    data: { 
      label: 'QC',
      description: 'Description',
      column: 'pemasaran',
      details: {
        'Process Owner': 'QC',
        'Duration': '2-3 days',
        'Input': 'Product specifications',
        'Output': 'Price agreement'
      }
    }
  },
  
  // Renbang column
  {
    id: '4',
    type: 'customNode',
    position: { x: getColumnX(2), y: 100 },
    data: { 
      label: 'Perencanaan Produksi',
      description: 'Plan production schedule',
      column: 'renbang',
      details: {
        'Process Owner': 'Planning Department',
        'Duration': '2 days',
        'Input': 'Validated order',
        'Output': 'Production plan'
      }
    }
  },
  
  // Produksi column
  {
    id: '5',
    type: 'customNode',
    position: { x: getColumnX(3), y: 100 },
    data: { 
      label: 'Material Preparation',
      description: 'Prepare materials for production',
      column: 'produksi',
      details: {
        'Process Owner': 'Production Team',
        'Duration': '1-2 days',
        'Input': 'Production plan',
        'Output': 'Prepared materials'
      }
    }
  },
  {
    id: '6',
    type: 'customNode',
    position: { x: getColumnX(3), y: 240 },
    data: { 
      label: 'Manufacturing',
      description: 'Manufacture the product',
      column: 'produksi',
      details: {
        'Process Owner': 'Production Manager',
        'Duration': '3-5 days',
        'Input': 'Prepared materials',
        'Output': 'Finished product'
      }
    }
  },
  
  // Logistik column
  {
    id: '7',
    type: 'documentNode',
    position: { x: getColumnX(4), y: 100 },
    data: { 
      label: 'Penilaian Persediaan',
      description: 'Check persediaan',
      column: 'logistik',
      details: {
        // 'Process Owner': 'QC',
        'Duration': '1 day',
        'Input': 'Finished product',
        'Output': 'Quality report'
      }
    }
  },
  {
    id: '8',
    type: 'customNode',
    position: { x: getColumnX(4), y: 240 },
    data: { 
      label: 'Packaging',
      description: 'Package products for delivery',
      column: 'logistik',
      details: {
        'Process Owner': 'Logistics Team',
        'Duration': '1 day',
        'Input': 'Quality-passed products',
        'Output': 'Packaged products'
      }
    }
  },

  
  // Pelanggan column (closing the loop)
  {
    id: '10',
    type: 'terminatorNode',
    position: { x: getColumnX(0), y: 280 },
    data: { 
      label: 'End',
      description: '',
      column: 'pelanggan',
      details: {
        'Process Owner': '',
        'Duration': 'N/A',
        'Input': 'Delivered products',
        'Output': 'Customer feedback'
      }
    }
  },
  {
    id: '11',
    type: 'customNode',
    position: { x: getColumnX(1), y: 240 },
    data: { 
      label: 'Pemesanan Penjualan',
      description: 'Descriptionnya apa',
      column: 'pemasaran',
      details: {
        'Process Owner': '',
        'Duration': '1 day',
        'Input': 'Order form',
        'Output': 'Validated order'
      }
    }
  },

  // Column headers
  ...columns.map((column, index) => ({
    id: `header-${column.id}`,
    type: 'customNode',
    position: { x: getColumnX(index), y: 10 },
    data: { 
      label: column.title,
      isHeader: true,
      column: column.id,
      color: column.color
    },
    draggable: false
  })),
];

// Initialize with empty edges array
export const initialEdges: Edge[] = [];

// Default pages structure
export const defaultPages = [
  {
    id: 'page1',
    title: 'Halaman 1',
    nodes: initialNodes,
    edges: initialEdges
  },
  {
    id: 'page2',
    title: 'Halaman 2',
    nodes: [...columns.map((column, index) => ({
      id: `header-${column.id}-page2`,
      type: 'customNode',
      position: { x: getColumnX(index), y: 10 },
      data: { 
        label: column.title,
        isHeader: true,
        column: column.id,
        color: column.color
      },
      draggable: false
    }))],
    edges: []
  },
  {
    id: 'page3',
    title: 'Halaman 3',
    nodes: [...columns.map((column, index) => ({
      id: `header-${column.id}-page3`,
      type: 'customNode',
      position: { x: getColumnX(index), y: 10 },
      data: { 
        label: column.title,
        isHeader: true,
        column: column.id,
        color: column.color
      },
      draggable: false
    }))],
    edges: []
  }
];
