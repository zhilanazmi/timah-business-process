
import { useState, useCallback, useRef } from 'react';
import { 
  useNodesState, 
  useEdgesState, 
  Node, 
  Edge, 
  Connection, 
  MarkerType 
} from 'reactflow';
import { toast } from 'sonner';
import { importFromJson, saveToLocalStorage } from '@/utils/exportUtils';
import { FlowPage } from '@/components/flow/PageTabs';
import { 
  handleDeleteEdge, 
  handleNodesChange, 
  handleEdgesChange, 
  handleConnect,
} from '@/utils/flow';

export const useFlowState = (initialPages: FlowPage[]) => {
  const [pages, setPages] = useState<FlowPage[]>(initialPages);
  const [currentPageId, setCurrentPageId] = useState<string>(initialPages[0].id);
  
  const currentPage = pages.find(p => p.id === currentPageId) || pages[0];
  
  const [nodes, setNodes] = useNodesState(currentPage.nodes);
  const [edges, setEdges] = useEdgesState(currentPage.edges.map(edge => ({
    ...edge,
    type: 'smoothstep'
  })));
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [undoStack, setUndoStack] = useState<Array<{ nodes: Node[], edges: Edge[] }>>([]);
  const [redoStack, setRedoStack] = useState<Array<{ nodes: Node[], edges: Edge[] }>>([]);
  
  const reactFlowInstance = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save current state for undo functionality
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

  // Handle node changes
  const onNodesChange = useCallback(
    (changes) => handleNodesChange(changes, setNodes, saveCurrentState),
    [saveCurrentState, setNodes]
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes) => handleEdgesChange(changes, setEdges, saveCurrentState),
    [saveCurrentState, setEdges]
  );

  // Handle new connections
  const onConnect = useCallback(
    (params: Connection) => handleConnect(params, setEdges, saveCurrentState, handleEdgeDelete),
    [saveCurrentState, setEdges, handleEdgeDelete]
  );

  // Update edges to have custom styling and handlers
  const updateEdgeStyling = useCallback(() => {
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
  }, [handleEdgeDelete, setEdges]);

  // Selection handlers
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };
  
  const onEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  const closeDetails = () => {
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  // Save handlers
  const handleSave = () => {
    saveToLocalStorage(nodes, edges);
  };

  // Undo/Redo
  const handleUndo = () => {
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
  };

  const handleRedo = () => {
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
  };

  // File import
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      saveCurrentState();
      importFromJson(file, setNodes, setEdges, () => {
        if (reactFlowInstance.current) {
          setTimeout(() => {
            reactFlowInstance.current.fitView();
          }, 50);
        }
      });
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  // Update pages when current page changes
  const updateCurrentPage = () => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === currentPageId ? { ...page, nodes, edges } : page
      )
    );
  };

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
    redoStack,
    reactFlowInstance,
    fileInputRef,

    // Methods
    saveCurrentState,
    handleEdgeDelete,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onEdgeClick,
    onPaneClick,
    closeDetails,
    handleSave,
    handleUndo,
    handleRedo,
    handleFileUpload,
    updateEdgeStyling,
    updateCurrentPage,
  };
};
