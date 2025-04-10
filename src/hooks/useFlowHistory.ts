
import { useCallback } from 'react';
import { Node, Edge } from 'reactflow';
import { toast } from 'sonner';

/**
 * Custom hook for handling flow history (undo/redo)
 */
export const useFlowHistory = (
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  edges: Edge[],
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  undoStack: Array<{ nodes: Node[], edges: Edge[] }>,
  setUndoStack: React.Dispatch<React.SetStateAction<Array<{ nodes: Node[], edges: Edge[] }>>>,
  redoStack: Array<{ nodes: Node[], edges: Edge[] }>,
  setRedoStack: React.Dispatch<React.SetStateAction<Array<{ nodes: Node[], edges: Edge[] }>>>
) => {
  // Handle undo
  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const currentState = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges))
    };
    const previousState = undoStack[undoStack.length - 1];
    setRedoStack(prev => [...prev, currentState]);
    setUndoStack(prev => prev.slice(0, -1));
    setNodes(previousState.nodes);
    setEdges(previousState.edges);
    toast.info("Undo berhasil");
  }, [undoStack, redoStack, nodes, edges, setUndoStack, setRedoStack, setNodes, setEdges]);

  // Handle redo
  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const currentState = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges))
    };
    const nextState = redoStack[redoStack.length - 1];
    setUndoStack(prev => [...prev, currentState]);
    setRedoStack(prev => prev.slice(0, -1));
    setNodes(nextState.nodes);
    setEdges(nextState.edges);
    toast.info("Redo berhasil");
  }, [undoStack, redoStack, nodes, edges, setUndoStack, setRedoStack, setNodes, setEdges]);

  return {
    handleUndo,
    handleRedo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0
  };
};
