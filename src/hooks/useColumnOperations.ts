
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useColumnOperations = (setNodes: any) => {
  const [availableColumns, setAvailableColumns] = useState<{id: string; title: string; color: string}[]>([]);

  const addColumn = useCallback((columnData: { id: string; title: string; color: string }) => {
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
  }, [availableColumns.length, setAvailableColumns, setNodes]);

  return {
    availableColumns,
    setAvailableColumns,
    addColumn
  };
};
