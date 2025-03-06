
import { Node, Edge } from 'reactflow';

const columnWidth = 200;
const nodeWidth = 180;
const gap = 80;

// Define columns
const columns = [
  { id: 'pelanggan', title: 'Pelanggan', color: 'bg-blue-900' },
  { id: 'pemasaran', title: 'Pemasaran', color: 'bg-blue-900' },
  { id: 'renbang', title: 'Renbang', color: 'bg-blue-900' },
  { id: 'produksi', title: 'Produksi', color: 'bg-blue-900' },
  { id: 'logistik', title: 'Logistik', color: 'bg-blue-900' },
  { id: 'mitra', title: 'Mitra Usaha', color: 'bg-blue-900' },
];

// Calculate x position based on column index
const getColumnX = (columnIndex: number) => columnIndex * (columnWidth + gap) + (columnWidth - nodeWidth) / 2;

export const initialNodes: Node[] = [
  // Pelanggan column
  {
    id: '1',
    type: 'customNode',
    position: { x: getColumnX(0), y: 100 },
    data: { 
      label: 'Order Request',
      description: 'Customer places an order',
      column: 'pelanggan',
      details: {
        'Process Owner': 'Customer',
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
      label: 'Order Validation',
      description: 'Validate customer order',
      column: 'pemasaran',
      details: {
        'Process Owner': 'Marketing Team',
        'Duration': '1 day',
        'Input': 'Order form',
        'Output': 'Validated order'
      }
    }
  },
  {
    id: '3',
    type: 'customNode',
    position: { x: getColumnX(1), y: 220 },
    data: { 
      label: 'Price Negotiation',
      description: 'Negotiate pricing with customer',
      column: 'pemasaran',
      details: {
        'Process Owner': 'Sales Manager',
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
    position: { x: getColumnX(2), y: 160 },
    data: { 
      label: 'Production Planning',
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
    position: { x: getColumnX(3), y: 220 },
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
    type: 'customNode',
    position: { x: getColumnX(4), y: 160 },
    data: { 
      label: 'Quality Check',
      description: 'Check product quality',
      column: 'logistik',
      details: {
        'Process Owner': 'QC Department',
        'Duration': '1 day',
        'Input': 'Finished product',
        'Output': 'Quality report'
      }
    }
  },
  {
    id: '8',
    type: 'customNode',
    position: { x: getColumnX(4), y: 280 },
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
  
  // Mitra column
  {
    id: '9',
    type: 'customNode',
    position: { x: getColumnX(5), y: 160 },
    data: { 
      label: 'Delivery',
      description: 'Deliver product to customer',
      column: 'mitra',
      details: {
        'Process Owner': 'Delivery Partner',
        'Duration': '1-3 days',
        'Input': 'Packaged products',
        'Output': 'Delivered products'
      }
    }
  },
  
  // Pelanggan column (closing the loop)
  {
    id: '10',
    type: 'customNode',
    position: { x: getColumnX(0), y: 280 },
    data: { 
      label: 'Receive Product',
      description: 'Customer receives the product',
      column: 'pelanggan',
      details: {
        'Process Owner': 'Customer',
        'Duration': 'N/A',
        'Input': 'Delivered products',
        'Output': 'Customer feedback'
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

// Empty initial edges - users will create connections themselves
export const initialEdges: Edge[] = [];
