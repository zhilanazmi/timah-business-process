
import { useCallback } from 'react';
import { toast } from 'sonner';
import { Node, Edge } from 'reactflow';
import { exportToJson, saveAsImage } from '@/utils/exportUtils';
import { FlowPage } from '@/components/flow/PageTabs';

interface UseFlowOperationsProps {
  reactFlowInstance: React.MutableRefObject<any>;
  reactFlowWrapper: React.RefObject<HTMLDivElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  saveCurrentState: () => void;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setPages: React.Dispatch<React.SetStateAction<FlowPage[]>>;
  currentPageId: string;
  setCurrentPageId: React.Dispatch<React.SetStateAction<string>>;
  deleteNode: (nodeId: string) => void;
  selectedNode: Node | null;
}

export const useFlowOperations = ({
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
}: UseFlowOperationsProps) => {
  
  // Zoom operations
  const handleZoomIn = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.zoomIn();
    }
  }, [reactFlowInstance]);

  const handleZoomOut = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.zoomOut();
    }
  }, [reactFlowInstance]);

  const handleFitView = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView();
    }
  }, [reactFlowInstance]);

  // Export operations
  const handleExport = useCallback(() => {
    exportToJson(reactFlowInstance);
  }, [reactFlowInstance]);

  const handleSaveAsImage = useCallback(() => {
    saveAsImage(reactFlowWrapper);
  }, [reactFlowWrapper]);

  const handleImport = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  // Page operations
  const handleChangePage = useCallback((pageId: string) => {
    setCurrentPageId(pageId);
  }, [setCurrentPageId]);

  const handleAddPage = useCallback((pageTitle: string, availableColumns: any[]) => {
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
  }, [setPages, setCurrentPageId]);

  const handleRenamePage = useCallback((pageId: string, newTitle: string) => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === pageId ? { ...page, title: newTitle } : page
      )
    );
    toast.success(`Nama halaman berhasil diubah menjadi "${newTitle}"`);
  }, [setPages]);

  const handleDeletePage = useCallback((pageId: string, pages: FlowPage[]) => {
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
  }, [currentPageId, setCurrentPageId, setPages]);

  // Node operations
  const onNodeDragStop = useCallback(() => {
    saveCurrentState();
  }, [saveCurrentState]);

  const handleCreateNode = useCallback((nodeData: Omit<Node, "id" | "position">, availableColumns: any[]) => {
    saveCurrentState();
    const sameColumnNodes = (nodes: Node[]) => nodes.filter(node => 
      node.data.column === nodeData.data.column && !node.data.isHeader
    );
    
    setNodes(nodes => {
      const filteredNodes = sameColumnNodes(nodes);
      let y = 100;
      if (filteredNodes.length > 0) {
        const maxY = Math.max(...filteredNodes.map(node => node.position.y));
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
      
      return [...nodes, newNode];
    });
  }, [saveCurrentState, setNodes]);

  const updateNode = useCallback((nodeId: string, data: any) => {
    saveCurrentState();
    setNodes(nds =>
      nds.map(node => 
        node.id === nodeId ? { ...node, data: data } : node
      )
    );
  }, [saveCurrentState, setNodes]);

  const handleDeleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      deleteNode(selectedNode.id);
    }
  }, [selectedNode, deleteNode]);

  return {
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
  };
};
