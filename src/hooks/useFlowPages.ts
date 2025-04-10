
import { useCallback } from 'react';
import { toast } from 'sonner';
import { FlowPage } from '@/components/flow/PageTabs';
import { MarkerType } from 'reactflow';

/**
 * Custom hook for handling flow pages
 */
export const useFlowPages = (
  pages: FlowPage[],
  setPages: React.Dispatch<React.SetStateAction<FlowPage[]>>,
  currentPageId: string,
  setCurrentPageId: React.Dispatch<React.SetStateAction<string>>,
  availableColumns: { id: string; title: string; color: string }[]
) => {
  // Change current page
  const handleChangePage = useCallback((pageId: string) => {
    setCurrentPageId(pageId);
  }, [setCurrentPageId]);

  // Add a new page
  const handleAddPage = useCallback((pageTitle: string) => {
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
  }, [availableColumns, setPages, setCurrentPageId]);

  // Rename a page
  const handleRenamePage = useCallback((pageId: string, newTitle: string) => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === pageId ? { ...page, title: newTitle } : page
      )
    );
    toast.success(`Nama halaman berhasil diubah menjadi "${newTitle}"`);
  }, [setPages]);

  // Delete a page
  const handleDeletePage = useCallback((pageId: string) => {
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
  }, [pages, currentPageId, setPages, setCurrentPageId]);

  return {
    handleChangePage,
    handleAddPage,
    handleRenamePage,
    handleDeletePage
  };
};
