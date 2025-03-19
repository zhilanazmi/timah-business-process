
import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  BackgroundVariant,
  Panel,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeDetail from './NodeDetail';
import { initialNodes, initialEdges } from '@/data/flowData';
import { toast } from 'sonner';
import NodeCreationModal from './NodeCreationModal';
import AddColumnModal from './AddColumnModal';
import { columns } from '@/data/flowData';
import ShortcutHelpModal from './ShortcutHelpModal';
import { importFromJson, saveToLocalStorage, exportToJson, saveAsImage } from '@/utils/exportUtils';
import FlowToolbar from './flow/FlowToolbar';
import { nodeTypes, edgeTypes } from './flow/flowTypes';
import { 
  handleDeleteEdge, 
  handleNodesChange, 
  handleEdgesChange, 
  handleConnect,
  createEdgeWithDeleteHandler
} from '@/utils/flowUtils';
import { useFlowShortcuts } from '@/hooks/useFlowShortcuts';
import ZoomControls from './flow/ZoomControls';

const FlowChart = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isShortcutHelpOpen, setIsShortcutHelpOpen] = useState(false);
  const [availableColumns, setAvailableColumns] = useState(columns);
  const [undoStack, setUndoStack] = useState<Array<{ nodes: Node[], edges: Edge[] }>>([]);
  const [redoStack, setRedoStack] = useState<Array<{ nodes: Node[], edges: Edge[] }>>([]);
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save current state for undo/redo functionality
  const saveCurrentState = useCallback(() => {
    setUndoStack(prev => [...prev, { 
      nodes: JSON.parse(JSON.stringify(nodes)), 
      edges: JSON.parse(JSON.stringify(edges)) 
    }]);
    setRedoStack([]);
  }, [nodes, edges]);

  // Edge deletion handler
  const handleEdgeDelete = useCallback((edgeId: string) => {
    handleDeleteEdge(edgeId, setEdges, saveCurrentState);
  }, [setEdges, saveCurrentState]);

  // Nodes and edges change handlers
  const onNodesChange = useCallback(
    (changes) => handleNodesChange(changes, setNodes, saveCurrentState),
    [saveCurrentState, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => handleEdgesChange(changes, setEdges, saveCurrentState),
    [saveCurrentState, setEdges]
  );

  // Connection handler
  const onConnect = useCallback(
    (params: Connection) => handleConnect(params, setEdges, saveCurrentState, handleEdgeDelete),
    [saveCurrentState, setEdges, handleEdgeDelete]
  );

  // Node and edge selection handlers
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

  const onNodeDragStop = useCallback(() => {
    saveCurrentState();
  }, [saveCurrentState]);

  // Node modification handlers
  const handleCreateNode = (nodeData: Omit<Node, "id" | "position">) => {
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
  };

  const addColumn = (columnData: { id: string; title: string; color: string }) => {
    saveCurrentState();
    
    setAvailableColumns(prevColumns => [...prevColumns, columnData]);
    
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
  };

  const updateNode = (nodeId: string, data: any) => {
    saveCurrentState();
    setNodes(nds =>
      nds.map(node => 
        node.id === nodeId ? { ...node, data: data } : node
      )
    );
  };

  const deleteNode = (nodeId: string) => {
    saveCurrentState();
    setNodes(nds => nds.filter(node => node.id !== nodeId));
    setEdges(eds => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  };

  // Undo/Redo handlers
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

  // Save, Export, Import handlers
  const handleSave = () => {
    saveToLocalStorage(nodes, edges);
  };

  const handleExport = () => {
    exportToJson(reactFlowInstance);
  };

  const handleSaveAsImage = () => {
    saveAsImage(reactFlowWrapper);
  };

  const handleZoomIn = () => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.zoomOut();
    }
  };

  const handleFitView = () => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView();
    }
  };

  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
      // Reset file input so the same file can be uploaded again
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  // Update edges to include delete handler
  useEffect(() => {
    setEdges(currentEdges => 
      currentEdges.map(edge => createEdgeWithDeleteHandler(edge, handleEdgeDelete))
    );
  }, [handleEdgeDelete]);

  // Register keyboard shortcuts
  useFlowShortcuts({
    onAddNode: () => setIsModalOpen(true),
    onAddColumn: () => setIsColumnModalOpen(true),
    onUndo: handleUndo,
    onRedo: handleRedo,
    onSave: handleSave,
    onExport: handleExport,
    onSaveAsImage: handleSaveAsImage,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onFitView: handleFitView,
    onDeleteSelectedNode: () => {
      if (selectedNode) {
        deleteNode(selectedNode.id);
        setSelectedNode(null);
      }
    },
    onShowShortcuts: () => setIsShortcutHelpOpen(true),
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
    selectedNode
  });

  return (
    <div className="h-full flex flex-col">
      <FlowToolbar 
        onAddNode={() => setIsModalOpen(true)}
        onAddColumn={() => setIsColumnModalOpen(true)}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        onSaveAsImage={handleSaveAsImage}
        onShowShortcuts={() => setIsShortcutHelpOpen(true)}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
      />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".json" 
        onChange={handleFileUpload} 
      />
      
      <div 
        className="flex-1 relative" 
        ref={reactFlowWrapper}
        style={{
          cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\'%3E%3Cpolygon points=\'0,0 0,16 4,12 8,0\' fill=\'black\'/%3E%3C/svg%3E") 0 0, auto'
        }}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            onNodeDragStop={onNodeDragStop}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onInit={(instance) => {
              reactFlowInstance.current = instance;
            }}
            fitView
            className="bg-gray-50"
            connectOnClick={true}
            deleteKeyCode={['Backspace', 'Delete']}
            multiSelectionKeyCode={['Control', 'Meta']}
            selectionKeyCode={['Shift']}
            defaultEdgeOptions={{
              type: 'buttonEdge',
              data: {
                onDelete: handleEdgeDelete
              },
            }}
          >
            <Controls />
            <MiniMap zoomable pannable nodeClassName={node => node.type} />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            <Panel position="bottom-right" className="bg-white p-2 rounded shadow-sm">
              <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
            </Panel>
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      
      {selectedNode && (
        <NodeDetail 
          node={selectedNode} 
          onClose={closeDetails}
          onUpdate={updateNode}
          onDelete={deleteNode}
        />
      )}
      
      <NodeCreationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreateNode={handleCreateNode}
        columns={availableColumns}
      />
      
      <AddColumnModal
        open={isColumnModalOpen}
        onOpenChange={setIsColumnModalOpen}
        onAddColumn={addColumn}
      />
      
      <ShortcutHelpModal
        open={isShortcutHelpOpen}
        onOpenChange={setIsShortcutHelpOpen}
      />
    </div>
  );
};

export default FlowChart;
