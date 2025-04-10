
import { useState, useCallback, useRef } from 'react';
import { Node, Edge, Connection, MarkerType } from 'reactflow';
import { toast } from 'sonner';
import { defaultPages, FlowPage } from '@/components/flow/PageTabs';
import { 
  handleDeleteEdge, 
  handleNodesChange, 
  handleEdgesChange, 
  handleConnect
} from '@/utils/flowUtils';

/**
 * Custom hook for managing flow state (nodes, edges, pages, selection, history)
 */
export const useFlowState = () => {
  // Pages state
  const [pages, setPages] = useState<FlowPage[]>(defaultPages);
  const [currentPageId, setCurrentPageId] = useState<string>(defaultPages[0].id);
  const currentPage = pages.find(p => p.id === currentPageId) || pages[0];
  
  // Flow state
  const [nodes, setNodes] = useState<Node[]>(currentPage.nodes);
  const [edges, setEdges] = useState<Edge[]>(currentPage.edges.map(edge => ({
    ...edge,
    type: 'smoothstep',
    animated: true,
    style: { 
      ...(edge.style || {}),
      strokeWidth: 2, 
      stroke: '#555' 
    },
    markerEnd: edge.markerEnd || {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#555'
    }
  })));
  
  // Selected elements
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  
  // History for undo/redo
  const [undoStack, setUndoStack] = useState<Array<{ nodes: Node[], edges: Edge[] }>>([]);
  const [redoStack, setRedoStack] = useState<Array<{ nodes: Node[], edges: Edge[] }>>([]);
  
  // References
  const reactFlowInstance = useRef<any>(null);
  
  // Effect to update nodes and edges when changing pages
  useEffect(() => {
    const page = pages.find(p => p.id === currentPageId);
    if (page) {
      setNodes(page.nodes);
      setEdges(page.edges.map(edge => ({ 
        ...edge, 
        type: 'smoothstep',
        animated: true,
        style: { 
          ...(edge.style || {}),
          strokeWidth: 2, 
          stroke: '#555' 
        },
        markerEnd: edge.markerEnd || {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#555'
        }
      })));
      setSelectedNode(null);
      setSelectedEdge(null);
      setUndoStack([]);
      setRedoStack([]);
    }
  }, [currentPageId]);

  // Effect to update pages when nodes or edges change
  useEffect(() => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === currentPageId ? { ...page, nodes, edges } : page
      )
    );
  }, [nodes, edges, currentPageId]);
  
  // Save current state for undo/redo
  const saveCurrentState = useCallback(() => {
    setUndoStack(prev => [...prev, { 
      nodes: JSON.parse(JSON.stringify(nodes)), 
      edges: JSON.parse(JSON.stringify(edges)) 
    }]);
    setRedoStack([]);
  }, [nodes, edges]);

  // Handle edge deletion
  const handleEdgeDelete = useCallback((edgeId: string) => {
    handleDeleteEdge(edgeId, setEdges, saveCurrentState);
  }, [setEdges, saveCurrentState]);

  // Handle nodes changes
  const onNodesChange = useCallback(
    (changes) => handleNodesChange(changes, setNodes, saveCurrentState),
    [saveCurrentState, setNodes]
  );

  // Handle edges changes
  const onEdgesChange = useCallback(
    (changes) => handleEdgesChange(changes, setEdges, saveCurrentState),
    [saveCurrentState, setEdges]
  );

  // Handle connecting nodes
  const onConnect = useCallback(
    (params: Connection) => handleConnect(params, setEdges, saveCurrentState, handleEdgeDelete),
    [saveCurrentState, setEdges, handleEdgeDelete]
  );

  // Handle click on node
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);
  
  // Handle click on edge
  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  // Handle click on pane
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  // Close details panel
  const closeDetails = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  // Handle node drag stop
  const onNodeDragStop = useCallback(() => {
    saveCurrentState();
  }, [saveCurrentState]);

  // Setup effect for ensuring edge styles are applied
  useEffect(() => {
    setEdges(currentEdges => 
      currentEdges.map(edge => ({
        ...edge,
        type: 'smoothstep',
        animated: true,
        style: { 
          ...(edge.style || {}), 
          strokeWidth: 2, 
          stroke: '#555' 
        },
        data: {
          ...edge.data,
          onDelete: handleEdgeDelete
        },
        markerEnd: edge.markerEnd || {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#555'
        }
      }))
    );
  }, [handleEdgeDelete]);

  return {
    // State
    pages,
    setPages,
    currentPageId,
    setCurrentPageId,
    currentPage,
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
    undoStack,
    setUndoStack,
    redoStack,
    setRedoStack,
    reactFlowInstance,
    
    // Callbacks
    saveCurrentState,
    handleEdgeDelete,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onEdgeClick,
    onPaneClick,
    closeDetails,
    onNodeDragStop
  };
};

import { useEffect } from 'react';
