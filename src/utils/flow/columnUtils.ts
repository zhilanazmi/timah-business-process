
import { Node } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { getColumnColor } from './nodeUtils';

// Function untuk membuat grid kolom
export const createColumnGrid = (columns: any[]) => {
  const startX = 50;
  const spacing = 250;
  const startY = 50;
  
  let nodes: Node[] = [];
  
  columns.forEach((column, index) => {
    const x = startX + index * spacing;
    const headerId = `header_${column.id}`;
    
    // Buat node header
    nodes.push({
      id: headerId,
      position: { x, y: startY },
      type: 'default',
      data: { 
        label: column.title,
        isHeader: true,
        color: getColumnColor(column.id)
      },
      draggable: false,
    });
  });
  
  return nodes;
};

// Function untuk mendapatkan posisi node baru dalam kolom
export const getNodePosition = (columnIndex: number, nodeCount: number) => {
  const startX = 50;
  const spacing = 250;
  const startY = 130; // Di bawah header
  const verticalSpacing = 120;
  
  return {
    x: startX + columnIndex * spacing,
    y: startY + nodeCount * verticalSpacing
  };
};

// Function untuk membuat ID kolom yang unik
export const generateColumnId = () => {
  return `kolom_${uuidv4().substring(0, 8)}`;
};
