
import { useRef, useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeDetail from '../NodeDetail';
import { initialNodes, initialEdges, columns, defaultPages } from '@/data/flowData';
import NodeCreationModal from '../NodeCreationModal';
import AddColumnModal from '../AddColumnModal';
import ShortcutHelpModal from '../ShortcutHelpModal';
import FlowToolbar from './FlowToolbar';
import { useFlowState } from '@/hooks/useFlowState';
import { useFlowOperations } from '@/hooks/useFlowOperations';
import { useColumnOperations } from '@/hooks/useColumnOperations';
import { useFlowShortcuts } from '@/hooks/useFlowShortcuts';
import FlowChartContent from './FlowChartContent';
import PageTabs from './PageTabs';

const FlowChart = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isShortcutHelpOpen, setIsShortcutHelpOpen] = useState(false);

  const {
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
    undoStack,
    redoStack,
    reactFlowInstance,
    fileInputRef,
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
    updateCurrentPage
  } = useFlowState(defaultPages);

  const { availableColumns, setAvailableColumns, addColumn } = useColumnOperations(setNodes);

  // Initialize available columns from data
  useEffect(() => {
    setAvailableColumns(columns);
  }, [setAvailableColumns]);

  // Update pages when nodes or edges change
  useEffect(() => {
    updateCurrentPage();
  }, [nodes, edges, currentPageId]);

  // Update edges styling when edge delete handler changes
  useEffect(() => {
    updateEdgeStyling();
  }, [handleEdgeDelete, updateEdgeStyling]);

  // Function to delete a node
  const deleteNode = (nodeId: string) => {
    saveCurrentState();
    setNodes(nds => nds.filter(node => node.id !== nodeId));
    setEdges(eds => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  };

  const {
    handleZoomIn,
    handleZoomOut,
    handleFitView,
    handleExport,
    handleSaveAsImage,
    handleImport,
    handleChangePage,
    handleAddPage,
    handleRenamePage,
    handleDeletePage,
    onNodeDragStop,
    handleCreateNode,
    updateNode,
    handleDeleteSelectedNode
  } = useFlowOperations({
    reactFlowInstance,
    reactFlowWrapper,
    fileInputRef,
    saveCurrentState,
    setNodes,
    setEdges,
    setPages,
    currentPageId,
    setCurrentPageId,
    deleteNode,
    selectedNode
  });

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
    onDeleteSelectedNode: handleDeleteSelectedNode,
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
        onAddPage={(title) => handleAddPage(title, availableColumns)}
        onRenamePage={handleRenamePage}
        onDeletePage={(pageId) => handleDeletePage(pageId, pages)}
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
          <FlowChartContent
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            onNodeDragStop={onNodeDragStop}
            reactFlowInstance={reactFlowInstance}
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            handleEdgeDelete={handleEdgeDelete}
          />
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
        onCreateNode={(nodeData) => handleCreateNode(nodeData, availableColumns)}
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
