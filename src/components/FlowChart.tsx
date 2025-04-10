
import { useRef, useState } from 'react';
import { columns } from '@/data/flowData';
import NodeDetail from './NodeDetail';
import NodeCreationModal from './NodeCreationModal';
import AddColumnModal from './AddColumnModal';
import ShortcutHelpModal from './ShortcutHelpModal';
import FlowToolbar from './flow/FlowToolbar';
import FlowContainer from './flow/FlowContainer';
import PageTabs from './flow/PageTabs';
import { useFlowState } from '@/hooks/useFlowState';
import { useFlowOperations } from '@/hooks/useFlowOperations';
import { useFlowHistory } from '@/hooks/useFlowHistory';
import { useFlowPages } from '@/hooks/useFlowPages';
import { useFlowZoom } from '@/hooks/useFlowZoom';
import { useFlowFileOperations } from '@/hooks/useFlowFileOperations';
import { useFlowShortcuts } from '@/hooks/useFlowShortcuts';

const FlowChart = () => {
  const [availableColumns, setAvailableColumns] = useState(columns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isShortcutHelpOpen, setIsShortcutHelpOpen] = useState(false);
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  // Use custom hooks for flow state and operations
  const { 
    pages, setPages, currentPageId, setCurrentPageId, currentPage,
    nodes, setNodes, edges, setEdges, 
    selectedNode, selectedEdge,
    undoStack, setUndoStack, redoStack, setRedoStack,
    reactFlowInstance, saveCurrentState, handleEdgeDelete,
    onNodesChange, onEdgesChange, onConnect,
    onNodeClick, onEdgeClick, onPaneClick, closeDetails, onNodeDragStop
  } = useFlowState();
  
  // Use custom hook for node and column operations
  const { handleCreateNode, addColumn, updateNode, deleteNode } = useFlowOperations(
    nodes, setNodes, edges, setEdges, saveCurrentState, availableColumns
  );
  
  // Use custom hook for history operations
  const { handleUndo, handleRedo, canUndo, canRedo } = useFlowHistory(
    nodes, setNodes, edges, setEdges, undoStack, setUndoStack, redoStack, setRedoStack
  );
  
  // Use custom hook for page operations
  const { handleChangePage, handleAddPage, handleRenamePage, handleDeletePage } = useFlowPages(
    pages, setPages, currentPageId, setCurrentPageId, availableColumns
  );
  
  // Use custom hook for zoom operations
  const { handleZoomIn, handleZoomOut, handleFitView } = useFlowZoom(reactFlowInstance);
  
  // Use custom hook for file operations
  const { fileInputRef, handleSave, handleExport, handleSaveAsImage, handleImport, handleFileUpload } = useFlowFileOperations(
    nodes, edges, setNodes, setEdges, reactFlowInstance, reactFlowWrapper, saveCurrentState
  );
  
  // Initialize flow instance
  const onInit = (instance: any) => {
    reactFlowInstance.current = instance;
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
      markerEnd: edge.markerEnd || {
        type: 'arrowclosed',
        width: 20,
        height: 20,
        color: '#555'
      }
    })));
  };
  
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
        closeDetails();
      }
    },
    onShowShortcuts: () => setIsShortcutHelpOpen(true),
    canUndo,
    canRedo,
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
        canUndo={canUndo}
        canRedo={canRedo}
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
        style={{
          cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\'%3E%3Cpolygon points=\'0,0 0,16 4,12 8,0\' fill=\'black\'/%3E%3C/svg%3E") 0 0, auto'
        }}
      >
        <FlowContainer
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          onNodeDragStop={onNodeDragStop}
          onInit={onInit}
          handleEdgeDelete={handleEdgeDelete}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
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
        onAddColumn={(columnData) => {
          setAvailableColumns(prev => [...prev, columnData]);
          addColumn(columnData);
        }}
      />
      
      <ShortcutHelpModal
        open={isShortcutHelpOpen}
        onOpenChange={setIsShortcutHelpOpen}
      />
    </div>
  );
};

export default FlowChart;
