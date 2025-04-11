
import { Node, NodeChange, Edge, EdgeChange, applyNodeChanges, applyEdgeChanges } from 'reactflow';

// Function untuk menangani perubahan node
export const onNodesChange = (changes: NodeChange[], nodes: Node[]) => {
  return applyNodeChanges(changes, nodes);
};

// Function untuk menangani perubahan nodes dengan saveState callback
export const handleNodesChange = (changes: NodeChange[], setNodes: React.Dispatch<React.SetStateAction<Node[]>>, saveState: () => void) => {
  setNodes((nds) => {
    const updatedNodes = applyNodeChanges(changes, nds);
    
    // Only save state for non-selection changes
    const hasNonSelectionChanges = changes.some(change => change.type !== 'select');
    if (hasNonSelectionChanges) {
      setTimeout(saveState, 0);
    }
    
    return updatedNodes;
  });
};

// Function untuk menangani perubahan edges dengan saveState callback
export const handleEdgesChange = (changes: EdgeChange[], setEdges: React.Dispatch<React.SetStateAction<Edge[]>>, saveState: () => void) => {
  setEdges((eds) => {
    const updatedEdges = applyEdgeChanges(changes, eds);
    
    // Only save state for non-selection changes
    const hasNonSelectionChanges = changes.some(change => change.type !== 'select');
    if (hasNonSelectionChanges) {
      setTimeout(saveState, 0);
    }
    
    return updatedEdges;
  });
};
