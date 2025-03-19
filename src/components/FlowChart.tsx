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
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  BackgroundVariant,
  Panel,
  MarkerType,
  getBezierPath,
  EdgeLabelRenderer,
  EdgeProps
} from 'reactflow';
import 'reactflow/dist/style.css';
import FlowNode from './FlowNode';
import { TerminatorNode, DiamondNode, DocumentNode } from './ShapeNodes';
import NodeDetail from './NodeDetail';
import { initialNodes, initialEdges } from '@/data/flowData';
import { Button } from './ui/button';
import { 
  Plus, 
  Save, 
  Download, 
  Upload,
  Trash, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut,
  Columns,
  ImageDown,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';
import NodeCreationModal from './NodeCreationModal';
import AddColumnModal from './AddColumnModal';
import { columns } from '@/data/flowData';
import { toPng } from 'html-to-image';
import ShortcutHelpModal from './ShortcutHelpModal';
import { importFromJson, saveToLocalStorage, exportToJson, saveAsImage } from '@/utils/exportUtils';
import FlowToolbar from './flow/FlowToolbar';

const handleDeleteEdge = (edgeId: string, setEdges: React.Dispatch<React.SetStateAction<Edge[]>>, saveCurrentState: () => void) => {
  saveCurrentState();
  setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
  toast.success('Koneksi berhasil dihapus');
};

const ButtonEdge = ({ 
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY, 
  sourcePosition, 
  targetPosition, 
  style = {}, 
  markerEnd, 
  data,
  selected
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data && data.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <>
      <path 
        id={id} 
        style={style} 
        className="react-flow__edge-path" 
        d={edgePath} 
        markerEnd={markerEnd}
      />
      {selected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              zIndex: 1,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <button
              onClick={onEdgeClick}
              className="w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-300 shadow-sm hover:bg-red-100 hover:border-red-300 transition-colors"
              title="Delete connection"
            >
              ×
            </button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

const nodeTypes = {
  customNode: FlowNode,
  terminatorNode: TerminatorNode,
  diamondNode: DiamondNode,
  documentNode: DocumentNode,
};

const edgeTypes = {
  buttonEdge: ButtonEdge,
};

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

  const handleDeleteEdge = useCallback((edgeId: string) => {
    saveCurrentState();
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    toast.success('Koneksi berhasil dihapus');
  }, [setEdges]);

  const saveCurrentState = useCallback(() => {
    setUndoStack(prev => [...prev, { 
      nodes: JSON.parse(JSON.stringify(nodes)), 
      edges: JSON.parse(JSON.stringify(edges)) 
    }]);
    setRedoStack([]);
  }, [nodes, edges]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const nonPositionChanges = changes.filter(
        change => change.type !== 'position' && change.type !== 'select'
      );
      if (nonPositionChanges.length > 0) {
        saveCurrentState();
      }
      setNodes(nds => applyNodeChanges(changes, nds));
    },
    [saveCurrentState, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const nonSelectChanges = changes.filter(change => change.type !== 'select');
      if (nonSelectChanges.length > 0) {
        saveCurrentState();
      }
      setEdges(eds => applyEdgeChanges(changes, eds));
    },
    [saveCurrentState, setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      saveCurrentState();
      setEdges(eds => addEdge({ 
        ...params, 
        animated: true,
        type: 'buttonEdge',
        style: { strokeWidth: 2, stroke: '#555' },
        data: { 
          label: 'Hubungan',
          onDelete: handleDeleteEdge
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#555'
        }
      }, eds));
      toast.success('Elemen berhasil dihubungkan');
    },
    [saveCurrentState, setEdges, handleDeleteEdge]
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

  const onNodeDragStop = useCallback(() => {
    saveCurrentState();
  }, [saveCurrentState]);

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

  const handleSave = () => {
    const flowData = {
      nodes: nodes.filter(node => !node.data.isHeader),
      edges
    };
    localStorage.setItem('flowChart', JSON.stringify(flowData));
    toast.success("Diagram berhasil disimpan");
  };

  const handleExport = () => {
    if (reactFlowInstance.current) {
      const flowData = reactFlowInstance.current.toObject();
      const dataStr = JSON.stringify(flowData);
      const dataUri =
        'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = 'flowchart-export.json';
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      toast.success("Diagram berhasil diexport");
    }
  };

  const handleSaveAsImage = () => {
    if (!reactFlowWrapper.current) {
      toast.error("Referensi diagram tidak ditemukan");
      return;
    }
  
    const reactFlowNode = reactFlowWrapper.current.querySelector('.react-flow');
    
    if (!reactFlowNode) {
      toast.error("Tidak dapat menemukan elemen diagram");
      return;
    }
    
    toast.info("Sedang memproses gambar...");
    
    const viewport = reactFlowNode.querySelector('.react-flow__viewport');
    const targetElement = viewport || reactFlowNode;
    
    if (!targetElement) {
      toast.error("Tidak dapat menemukan konten diagram");
      return;
    }
  
    // Get all handles
    const handles = reactFlowWrapper.current.querySelectorAll('.react-flow__handle');
    
    // Store their original display values and hide them
    const originalDisplayValues = Array.from(handles).map(handle => {
      const originalDisplay = (handle as HTMLElement).style.display;
      (handle as HTMLElement).style.display = 'none';
      return originalDisplay;
    });
  
    setTimeout(() => {
      toPng(targetElement as HTMLElement, { 
        backgroundColor: '#ffffff',
        quality: 1,
        pixelRatio: 2,
        cacheBust: true, 
        filter: (node) => {
          if (!node) return true;
          
          let classStr = "";
          
          if (node.className !== undefined && node.className !== null) {
            if (typeof node.className === 'string') {
              classStr = node.className;
            } else if (node.className && typeof node.className === 'object') {
              if ('baseVal' in node.className) {
                classStr = (node.className as SVGAnimatedString).baseVal;
              } else if (typeof (node.className as any).toString === 'function') {
                classStr = (node.className as any).toString();
              }
            }
          }
          
          const checkClass = (str: string, className: string) => {
            return str.indexOf(className) === -1;
          };
          
          // Add handle to the filter
          return checkClass(classStr, 'react-flow__controls') && 
                 checkClass(classStr, 'react-flow__minimap') && 
                 checkClass(classStr, 'react-flow__panel') &&
                 checkClass(classStr, 'react-flow__handle') && // This filters out any handles that weren't hidden
                 checkClass(classStr, 'toast-');
        }
      })
      .then((dataUrl) => {
        const tanggal = new Date().toISOString().split('T')[0];
        const link = document.createElement('a');
        link.download = `flowchart-${tanggal}.png`;
        link.href = dataUrl;
        link.click();
        toast.success("Diagram berhasil disimpan sebagai gambar");
        
        // Restore handles visibility
        handles.forEach((handle, index) => {
          (handle as HTMLElement).style.display = originalDisplayValues[index] || '';
        });
      })
      .catch((error) => {
        console.error('Error saat menyimpan gambar:', error);
        toast.error("Gagal menyimpan gambar: " + error.message);
        
        // Restore handles visibility even on error
        handles.forEach((handle, index) => {
          (handle as HTMLElement).style.display = originalDisplayValues[index] || '';
        });
        
        try {
          // Fallback method
          toPng(targetElement as HTMLElement, { 
            backgroundColor: '#ffffff',
            quality: 1,
            pixelRatio: 2
          })
          .then((dataUrl) => {
            const tanggal = new Date().toISOString().split('T')[0];
            const link = document.createElement('a');
            link.download = `flowchart-${tanggal}-alt.png`;
            link.href = dataUrl;
            link.click();
            toast.success("Diagram berhasil disimpan dengan metode alternatif");
          })
          .catch((fallbackError) => {
            toast.error("Semua metode gagal menyimpan gambar");
          });
        } catch (fallbackError) {
          toast.error("Gagal menggunakan metode alternatif");
        }
      });
    }, 100);
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

  useEffect(() => {
    setEdges(currentEdges => 
      currentEdges.map(edge => ({
        ...edge,
        type: 'buttonEdge',
        data: {
          ...edge.data,
          onDelete: handleDeleteEdge
        }
      }))
    );
  }, [handleDeleteEdge]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (activeElement && ['INPUT', 'TEXTAREA'].includes(activeElement.tagName)) {
        return;
      }

      const ctrlOrCmd = event.ctrlKey || event.metaKey;

      if (ctrlOrCmd && event.key === 'n') {
        event.preventDefault();
        setIsModalOpen(true);
      }
      else if (ctrlOrCmd && event.shiftKey && event.key === 'c') {
        event.preventDefault();
        setIsColumnModalOpen(true);
      }
      else if (ctrlOrCmd && !event.shiftKey && event.key === 'z' && undoStack.length > 0) {
        event.preventDefault();
        handleUndo();
      }
      else if ((ctrlOrCmd && event.shiftKey && event.key === 'z') || 
               (ctrlOrCmd && event.key === 'y')) {
        event.preventDefault();
        if (redoStack.length > 0) handleRedo();
      }
      else if (ctrlOrCmd && !event.shiftKey && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
      else if (ctrlOrCmd && event.key === 'e') {
        event.preventDefault();
        handleExport();
      }
      else if (ctrlOrCmd && event.key === 'i') {
        event.preventDefault();
        handleImport();
      }
      else if (ctrlOrCmd && event.shiftKey && event.key === 's') {
        event.preventDefault();
        handleSaveAsImage();
      }
      else if (ctrlOrCmd && (event.key === '+' || event.key === '=')) {
        event.preventDefault();
        handleZoomIn();
      }
      else if (ctrlOrCmd && event.key === '-') {
        event.preventDefault();
        handleZoomOut();
      }
      else if (ctrlOrCmd && event.key === '0') {
        event.preventDefault();
        handleFitView();
      }
      else if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNode) {
        event.preventDefault();
        deleteNode(selectedNode.id);
        setSelectedNode(null);
      }
      else if (event.key === '?') {
        event.preventDefault();
        setIsShortcutHelpOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    setIsModalOpen, setIsColumnModalOpen, 
    handleUndo, handleRedo, undoStack.length, redoStack.length,
    handleSave, handleExport, handleSaveAsImage,
    handleZoomIn, handleZoomOut, handleFitView, 
    selectedNode, deleteNode, setIsShortcutHelpOpen
  ]);

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
                onDelete: handleDeleteEdge
              },
            }}
          >
            <Controls />
            <MiniMap zoomable pannable nodeClassName={node => node.type} />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            <Panel position="bottom-right" className="bg-white p-2 rounded shadow-sm">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleZoomIn}
                  title="Perbesar (Ctrl+Plus)"
                >
                  <ZoomIn size={16} />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleZoomOut}
                  title="Perkecil (Ctrl+Minus)"
                >
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
