
import { useCallback } from 'react';
import { Node, Edge } from 'reactflow';
import { toast } from 'sonner';
import { MarkerType } from 'reactflow';

/**
 * Custom hook for handling node and column operations
 */
export const useFlowOperations = (
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  edges: Edge[],
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  saveCurrentState: () => void,
  availableColumns: { id: string; title: string; color: string }[]
) => {
  // Create a new node
  const handleCreateNode = useCallback((nodeData: Omit<Node, "id" | "position">) => {
    saveCurrentState();
    const sameColumnNodes = nodes.filter(node => 
      node.data.column === nodeData.data.column && !node.data.isHeader
    );
    
    let y = 100;
    if (sameColumnNodes.length > 0) {
      const maxY = Math.max(...sameColumnNodes.map(node => node.position.y));
      y = maxY + 120;
    }
    
    const columnIndex = availableColumns.findIndex(col => col.id === nodeData.data.column);
    const nodeWidth = 180;
    const gap = 80;
    const x = columnIndex * (200 + gap) + (200 - nodeWidth) / 2;
    
    const newNode = {
      id: `node-${Date.now()}`,
      type: nodeData.type,
      position: { x, y },
      data: nodeData.data
    };
    
    setNodes(nds => [...nds, newNode]);
  }, [nodes, setNodes, availableColumns, saveCurrentState]);

  // Add a new column
  const addColumn = useCallback((columnData: { id: string; title: string; color: string }) => {
    saveCurrentState();
    
    const columnIndex = availableColumns.length;
    const columnWidth = 200;
    const gap = 80;
    const nodeWidth = 180;
    const x = columnIndex * (columnWidth + gap) + (columnWidth - nodeWidth) / 2;
    
    const headerNode = {
      id: `header-${columnData.id}`,
      type: 'customNode',
      position: { x, y: 10 },
      data: { 
        label: columnData.title,
        isHeader: true,
        column: columnData.id,
        color: columnData.color
      },
      draggable: false,
      style: { 
        backgroundColor: columnData.color 
      }
    };
    
    setNodes(nds => [...nds, headerNode]);
    toast.success(`Kolom ${columnData.title} berhasil ditambahkan`);
  }, [availableColumns, setNodes, saveCurrentState]);

  // Update a node
  const updateNode = useCallback((nodeId: string, data: any) => {
    saveCurrentState();
    setNodes(nds =>
      nds.map(node => 
        node.id === nodeId ? { ...node, data: data } : node
      )
    );
  }, [setNodes, saveCurrentState]);

  // Delete a node
  const deleteNode = useCallback((nodeId: string) => {
    saveCurrentState();
    setNodes(nds => nds.filter(node => node.id !== nodeId));
    setEdges(eds => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges, saveCurrentState]);

  return {
    handleCreateNode,
    addColumn,
    updateNode,
    deleteNode
  };
};
