
import { useCallback, useRef } from 'react';
import { saveToLocalStorage, exportToJson, saveAsImage, importFromJson } from '@/utils/exportUtils';
import { Node, Edge } from 'reactflow';
import { toast } from 'sonner';

/**
 * Custom hook for handling flow file operations
 */
export const useFlowFileOperations = (
  nodes: Node[],
  edges: Edge[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  reactFlowInstance: React.MutableRefObject<any>,
  reactFlowWrapper: React.RefObject<HTMLDivElement>,
  saveCurrentState: () => void
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save flow to local storage
  const handleSave = useCallback(() => {
    saveToLocalStorage(nodes, edges);
  }, [nodes, edges]);

  // Export flow to JSON
  const handleExport = useCallback(() => {
    exportToJson(reactFlowInstance);
  }, [reactFlowInstance]);

  // Save flow as image
  const handleSaveAsImage = useCallback(() => {
    saveAsImage(reactFlowWrapper);
  }, [reactFlowWrapper]);

  // Import flow from JSON
  const handleImport = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
      if (event.target) {
        event.target.value = '';
      }
    }
  }, [saveCurrentState, setNodes, setEdges, reactFlowInstance]);

  return {
    fileInputRef,
    handleSave,
    handleExport,
    handleSaveAsImage,
    handleImport,
    handleFileUpload
  };
};
