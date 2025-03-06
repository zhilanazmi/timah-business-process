
import { useState, useCallback, useRef } from 'react';
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
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  BackgroundVariant,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import FlowNode from './FlowNode';
import NodeDetail from './NodeDetail';
import { initialNodes, initialEdges } from '@/data/flowData';
import { Button } from './ui/button';
import { Plus, Save, Download, Trash, Undo, Redo, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from 'sonner';
import NodeCreationModal from './NodeCreationModal';
import { columns } from '@/data/flowData';

const nodeTypes = {
  customNode: FlowNode,
};

const FlowChart = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [undoStack, setUndoStack] = useState<Array<{nodes: Node[], edges: Edge[]}>>([]);
  const [redoStack, setRedoStack] = useState<Array<{nodes: Node[], edges: Edge[]}>>([]);
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<any>(null);

  // Menyimpan state saat ini ke undo stack
  const saveCurrentState = () => {
    setUndoStack(prev => [...prev, { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) }]);
    setRedoStack([]);
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      // Filter out changes yang tidak perlu menyimpan history
      const significantChanges = changes.filter(
        change => change.type !== 'select' && change.type !== 'position'
      );
      
      if (significantChanges.length > 0) {
        saveCurrentState();
      }
      
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const significantChanges = changes.filter(
        change => change.type !== 'select'
      );
      
      if (significantChanges.length > 0) {
        saveCurrentState();
      }
      
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      saveCurrentState();
      setEdges((eds) => addEdge({ 
        ...params, 
        animated: true,
        style: { strokeWidth: 2, stroke: '#555' },
        data: { label: 'Hubungan' }
      }, eds));
      toast.success('Elemen berhasil dihubungkan');
    },
    [setEdges]
  );

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

  const handleCreateNode = (nodeData: Omit<Node, "id" | "position">) => {
    saveCurrentState();
    
    // Find the maximum y position of nodes in the same column to place the new node below
    const sameColumnNodes = nodes.filter(node => 
      node.data.column === nodeData.data.column && !node.data.isHeader
    );
    
    let y = 100; // Default position
    if (sameColumnNodes.length > 0) {
      const maxY = Math.max(...sameColumnNodes.map(node => node.position.y));
      y = maxY + 120;
    }
    
    // Find the column index to determine x position
    const columnIndex = columns.findIndex(col => col.id === nodeData.data.column);
    
    // Calculate x position based on column
    const columnWidth = 200;
    const nodeWidth = 180;
    const gap = 80;
    const x = columnIndex * (columnWidth + gap) + (columnWidth - nodeWidth) / 2;
    
    const newNode = {
      id: `node-${Date.now()}`,
      type: nodeData.type,
      position: { x, y },
      data: nodeData.data
    };
    
    setNodes(nds => [...nds, newNode]);
  };

  const updateNode = (nodeId: string, data: any) => {
    saveCurrentState();
    setNodes(nds => 
      nds.map(node => 
        node.id === nodeId 
          ? { ...node, data: data }
          : node
      )
    );
  };

  const deleteNode = (nodeId: string) => {
    saveCurrentState();
    // Hapus node
    setNodes(nds => nds.filter(node => node.id !== nodeId));
    // Hapus semua edge yang terkait dengan node
    setEdges(eds => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    
    const currentState = { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) };
    const previousState = undoStack[undoStack.length - 1];
    
    setRedoStack(prev => [...prev, currentState]);
    setUndoStack(prev => prev.slice(0, -1));
    
    setNodes(previousState.nodes);
    setEdges(previousState.edges);
    
    toast.info("Undo berhasil");
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    
    const currentState = { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) };
    const nextState = redoStack[redoStack.length - 1];
    
    setUndoStack(prev => [...prev, currentState]);
    setRedoStack(prev => prev.slice(0, -1));
    
    setNodes(nextState.nodes);
    setEdges(nextState.edges);
    
    toast.info("Redo berhasil");
  };

  const handleSave = () => {
    const flowData = {
      nodes: nodes.filter(node => !node.data.isHeader), // Exclude header nodes
      edges
    };
    
    // In a real app, you would save to backend or localStorage
    localStorage.setItem('flowChart', JSON.stringify(flowData));
    toast.success("Diagram berhasil disimpan");
  };

  const handleExport = () => {
    if (reactFlowInstance.current) {
      const flowData = reactFlowInstance.current.toObject();
      const dataStr = JSON.stringify(flowData);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'flowchart-export.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success("Diagram berhasil diexport");
    }
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-2 bg-gray-100 rounded mb-2">
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            Tambah Elemen
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleUndo}
            disabled={undoStack.length === 0}
            title="Undo"
          >
            <Undo size={16} />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            title="Redo"
          >
            <Redo size={16} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleSave}
            title="Simpan"
          >
            <Save size={16} className="mr-1" />
            Simpan
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleExport}
            title="Export"
          >
            <Download size={16} className="mr-1" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative" ref={reactFlowWrapper}>
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
            nodeTypes={nodeTypes}
            onInit={(instance) => {
              reactFlowInstance.current = instance;
            }}
            fitView
            className="bg-gray-50"
            connectOnClick={true}
            deleteKeyCode={['Backspace', 'Delete']}
            multiSelectionKeyCode={['Control', 'Meta']}
            selectionKeyCode={['Shift']}
          >
            <Controls />
            <MiniMap zoomable pannable />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            
            <Panel position="bottom-right" className="bg-white p-2 rounded shadow-sm">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleZoomIn}>
                  <ZoomIn size={16} />
                </Button>
                <Button size="sm" variant="outline" onClick={handleZoomOut}>
                  <ZoomOut size={16} />
                </Button>
              </div>
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
        columns={columns}
      />
    </div>
  );
};

export default FlowChart;
