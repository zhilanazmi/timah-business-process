
import { Node } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

// Membuat node baru
export const createNode = (
  nodeType: string,
  position: { x: number; y: number },
  label: string = 'Node Baru',
  column: string = ''
) => {
  const id = `node_${uuidv4()}`;

  // Basis node properties
  const baseNodeProps = {
    id,
    position,
    data: { 
      label,
      column
    },
    draggable: true,
  };

  // Sesuaikan berdasarkan tipe node
  switch (nodeType) {
    case 'terminator':
      return {
        ...baseNodeProps,
        type: 'terminator',
        style: { width: 150, height: 60 },
      };
    case 'diamond':
      return {
        ...baseNodeProps,
        type: 'diamond',
        style: { width: 150, height: 100 },
      };
    case 'document':
      return {
        ...baseNodeProps,
        type: 'document',
        data: { 
          ...baseNodeProps.data, 
          width: 180, 
          height: 90,
          onResize: (width: number, height: number) => {
            // Atur ukuran document node
          }
        },
      };
    default:
      return {
        ...baseNodeProps,
        style: { width: 180, minHeight: 60 },
      };
  }
};

// Function untuk meng-update data node
export const updateNodeData = (nodes: Node[], nodeId: string, newData: any) => {
  return nodes.map(node => 
    node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
  );
};

// Helper untuk membuat header node
export const createColumnHeaderNode = (columnId: string, title: string, position: { x: number; y: number }) => {
  return {
    id: `header_${columnId}`,
    position,
    type: 'default',
    data: { 
      label: title,
      isHeader: true,
      color: getColumnColor(columnId)
    },
    draggable: false,
  };
};

// Function untuk menghitung node dalam kolom
export const countNodesInColumn = (nodes: Node[], columnId: string) => {
  return nodes.filter(node => !node.data.isHeader && node.data.column === columnId).length;
};

// Function untuk mendapatkan warna kolom
export const getColumnColor = (columnId: string) => {
  switch (columnId) {
    case 'kolomsatu':
      return 'bg-blue-800';
    case 'kolomdua':
      return 'bg-green-800';
    case 'kolomtiga':
      return 'bg-amber-800';
    case 'kolomempat':
      return 'bg-red-800';
    case 'kolomlima':
      return 'bg-purple-800';
    case 'kolomenam':
      return 'bg-teal-800';
    default:
      return 'bg-gray-800';
  }
};
