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
  ReactFlowInstance
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeDetail from './NodeDetail';
import { initialNodes, initialEdges, columns, defaultPages } from '@/data/flowData';
import { toast } from 'sonner';
import NodeCreationModal from './NodeCreationModal';
import AddColumnModal from './AddColumnModal';
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
import PageTabs, { FlowPage } from './flow/PageTabs';
import { Heart, Info, Mail, ExternalLink } from 'lucide-react';

const FlowChart = () => {
  const [pages, setPages] = useState<FlowPage[]>(defaultPages);
  const [currentPageId, setCurrentPageId] = useState<string>(defaultPages[0].id);
  
  const currentPage = pages.find(p => p.id === currentPageId) || pages[0];
  
  const [nodes, setNodes] = useNodesState(currentPage.nodes);
  const [edges, setEdges] = useEdgesState(currentPage.edges.map(edge => ({
    ...edge,
    type: 'smoothstep'
  })));
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isShortcutHelpOpen, setIsShortcutHelpOpen] = useState(false);
  const [availableColumns, setAvailableColumns] = useState(columns);
  const [undoStack, setUndoStack] = useState<Array<{ nodes: Node[], edges: Edge[] }>>([]);
  const [redoStack, setRedoStack] = useState<Array<{ nodes: Node[], edges: Edge[] }>>([]);
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  }, [currentPageId, setNodes, setEdges]);

  useEffect(() => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === currentPageId ? { ...page, nodes, edges } : page
      )
    );
  }, [nodes, edges, currentPageId]);

  const saveCurrentState = useCallback(() => {
    setUndoStack(prev => [...prev, { 
      nodes: JSON.parse(JSON.stringify(nodes)), 
      edges: JSON.parse(JSON.stringify(edges)) 
    }]);
    setRedoStack([]);
  }, [nodes, edges]);

  const handleEdgeDelete = useCallback((edgeId: string) => {
    handleDeleteEdge(edgeId, setEdges, saveCurrentState);
  }, [setEdges, saveCurrentState]);

  const onNodesChange = useCallback(
    (changes) => handleNodesChange(changes, setNodes, saveCurrentState),
    [saveCurrentState, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => handleEdgesChange(changes, setEdges, saveCurrentState),
    [saveCurrentState, setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => handleConnect(params, setEdges, saveCurrentState, handleEdgeDelete),
    [saveCurrentState, setEdges, handleEdgeDelete]
  );

  const handleHeaderUpdate = (nodeId: string, newTitle: string, newColor: string) => {
    saveCurrentState();
    
    setNodes(nds => 
      nds.map(node => 
        node.id === nodeId 
          ? {
              ...node,
              data: {
                ...node.data,
                label: newTitle,
                color: newColor
              }
            } 
          : node
      )
    );
    
    toast.success("Kolom berhasil diperbarui");
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.data.isHeader) {
      return;
    }
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
      }, handleHeaderUpdate);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleChangePage = (pageId: string) => {
    setCurrentPageId(pageId);
  };

  const handleAddPage = (pageTitle: string) => {
    const newPageId = `page-${Date.now()}`;
    
    const newPageNodes = availableColumns.map((column, index) => {
      const nodeWidth = 180;
      const gap = 80;
      const x = index * (200 + gap) + (200 - nodeWidth) / 2;
      
      return {
        id: `header-${column.id}-${newPageId}`,
        type: 'customNode',
        position: { x, y: 10 },
        data: { 
          label: column.title,
          isHeader: true,
          column: column.id,
          color: column.color
        },
        draggable: false
      };
    });
    
    const newPage: FlowPage = {
      id: newPageId,
      title: pageTitle,
      nodes: newPageNodes,
      edges: []
    };
    
    setPages(prevPages => [...prevPages, newPage]);
    setCurrentPageId(newPageId);
    toast.success(`Halaman "${pageTitle}" berhasil ditambahkan`);
  };

  const handleRenamePage = (pageId: string, newTitle: string) => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === pageId ? { ...page, title: newTitle } : page
      )
    );
    toast.success(`Nama halaman berhasil diubah menjadi "${newTitle}"`);
  };

  const handleDeletePage = (pageId: string) => {
    if (pages.length <= 1) {
      toast.error("Tidak dapat menghapus halaman terakhir");
      return;
    }
    
    const currentIndex = pages.findIndex(p => p.id === pageId);
    
    let newPageId = pages[0].id;
    if (currentIndex > 0) {
      newPageId = pages[currentIndex - 1].id;
    } else if (pages.length > 1) {
      newPageId = pages[1].id;
    }
    
    if (currentPageId === pageId) {
      setCurrentPageId(newPageId);
    }
    
    setPages(prevPages => prevPages.filter(page => page.id !== pageId));
    toast.success(`Halaman berhasil dihapus`);
  };

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

  useEffect(() => {
    setNodes(nds => 
      nds.map(node => {
        if (node.data.isHeader) {
          return {
            ...node,
            data: {
              ...node.data,
              onHeaderUpdate: handleHeaderUpdate
            }
          };
        }
        return node;
      })
    );
  }, [currentPageId]);

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
    <div className="h-full w-full flex flex-col">
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
      
      <PageTabs 
        pages={pages} 
        currentPage={currentPageId} 
        onChangePage={handleChangePage}
        onAddPage={handleAddPage}
        onRenamePage={handleRenamePage}
        onDeletePage={handleDeletePage}
      />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".json" 
        onChange={handleFileUpload} 
      />
      
      <div 
        className="flex-1 h-full w-full relative" 
        ref={reactFlowWrapper}
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
              const updatedNodes = instance.getNodes().map(node => {
                if (node.data.isHeader) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      onHeaderUpdate: handleHeaderUpdate
                    }
                  };
                }
                return node;
              });
              instance.setNodes(updatedNodes);
              
              const currentEdges = instance.getEdges();
              instance.setEdges(currentEdges.map(edge => ({
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
              })));
            }}
            fitView
            className="bg-gray-50"
            minZoom={0.01}
            connectOnClick={true}
            deleteKeyCode={['Backspace', 'Delete']}
            multiSelectionKeyCode={['Control', 'Meta']}
            selectionKeyCode={['Shift']}
            defaultEdgeOptions={{
              type: 'smoothstep',
              animated: true,
              style: { strokeWidth: 2, stroke: '#555' },
              data: {
                onDelete: handleEdgeDelete
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#555'
              }
            }}
          >
            <Controls />
            <MiniMap zoomable pannable nodeClassName={node => node.type || ''} />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            <Panel position="bottom-right" className="bg-white p-2 rounded shadow-sm">
              <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
            </Panel>
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-3 px-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>© {new Date().getFullYear()} PT. Timah Industri</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span>Versi 1.0.0</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:support@timahindustri.com" 
              className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              title="Hubungi dukungan"
            >
              <Mail size={14} />
              <span className="hidden sm:inline">Dukungan</span>
            </a>
            <a 
              href="#" 
              onClick={() => setIsShortcutHelpOpen(true)}
              className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              title="Bantuan"
            >
              <Info size={14} />
              <span className="hidden sm:inline">Bantuan</span>
            </a>
            <a 
              href="https://timahindustri.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              title="Kunjungi situs kami"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Situs Web</span>
            </a>
          </div>
        </div>
      </footer>
      
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
