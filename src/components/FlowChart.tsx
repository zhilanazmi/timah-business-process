
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
} from 'reactflow';
import 'reactflow/dist/style.css';
import FlowNode from './FlowNode';
import NodeDetail from './NodeDetail';
import { initialNodes, initialEdges } from '@/data/flowData';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const nodeTypes = {
  customNode: FlowNode,
};

const FlowChart = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<any>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
      toast.success('Elemen berhasil dihubungkan');
      setIsConnecting(false);
    },
    [setEdges]
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const closeDetails = () => {
    setSelectedNode(null);
  };

  const addNewNode = () => {
    const columnId = prompt('Masukkan kolom (pelanggan, pemasaran, renbang, produksi, logistik, mitra):');
    if (!columnId) return;
    
    const label = prompt('Masukkan nama elemen:');
    if (!label) return;
    
    const description = prompt('Masukkan deskripsi (opsional):');
    
    // Find the maximum y position of nodes in the same column to place the new node below
    const sameColumnNodes = nodes.filter(node => 
      node.data.column === columnId && !node.data.isHeader
    );
    
    let y = 100; // Default position
    if (sameColumnNodes.length > 0) {
      const maxY = Math.max(...sameColumnNodes.map(node => node.position.y));
      y = maxY + 120;
    }
    
    // Find the column index to determine x position
    const columns = ['pelanggan', 'pemasaran', 'renbang', 'produksi', 'logistik', 'mitra'];
    const columnIndex = columns.indexOf(columnId);
    
    if (columnIndex === -1) {
      toast.error('Kolom tidak valid');
      return;
    }
    
    // Calculate x position based on column
    const columnWidth = 200;
    const nodeWidth = 180;
    const gap = 80;
    const x = columnIndex * (columnWidth + gap) + (columnWidth - nodeWidth) / 2;
    
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'customNode',
      position: { x, y },
      data: {
        label,
        description,
        column: columnId,
        details: {
          'Process Owner': 'TBD',
          'Duration': 'TBD',
          'Input': 'TBD',
          'Output': 'TBD'
        }
      }
    };
    
    setNodes(nds => [...nds, newNode]);
    toast.success('Elemen baru ditambahkan');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-2 bg-gray-100 rounded mb-2">
        <Button 
          size="sm" 
          onClick={addNewNode} 
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Tambah Elemen
        </Button>
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
            nodeTypes={nodeTypes}
            onInit={(instance) => {
              reactFlowInstance.current = instance;
            }}
            fitView
            className="bg-gray-50"
            connectOnClick={true}
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      {selectedNode && (
        <NodeDetail node={selectedNode} onClose={closeDetails} />
      )}
    </div>
  );
};

export default FlowChart;
