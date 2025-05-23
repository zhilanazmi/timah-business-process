import { toPng } from 'html-to-image';
import { toast } from 'sonner';
import { Edge, Node, ReactFlowInstance } from 'reactflow';

/**
 * Saves the flow chart as an image
 */
export const saveAsImage = (wrapperRef: React.RefObject<HTMLDivElement>) => {
  if (!wrapperRef.current) {
    toast.error("Referensi diagram tidak ditemukan");
    return;
  }

  const reactFlowNode = wrapperRef.current.querySelector('.react-flow');
  
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

  // Get all handles (connection points)
  const handles = wrapperRef.current.querySelectorAll('.react-flow__handle');
  
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
            } else if (typeof (node.className as object).toString === 'function') {
              classStr = (node.className as object).toString();
            }
          }
        }
        
        const checkClass = (str: string, className: string) => {
          return str.indexOf(className) === -1;
        };
        
        return checkClass(classStr, 'react-flow__controls') && 
               checkClass(classStr, 'react-flow__minimap') && 
               checkClass(classStr, 'react-flow__panel') &&
               checkClass(classStr, 'react-flow__handle') && // Added handle filtering
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
        // Fallback method with handles still hidden
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

interface FlowInstanceRef {
  current: ReactFlowInstance | null;
}

/**
 * Exports the flow chart data as JSON
 */
export const exportToJson = (input: FlowInstanceRef | { nodes: Node[]; edges: Edge[] } | Node[]) => {
  let flowData;

  // Handle different input types
  if ('current' in input && input.current) {
    // ReactFlowInstance ref
    flowData = input.current.toObject();
  } else if (Array.isArray(input)) {
    // Array of nodes
    flowData = {
      nodes: input,
      edges: []
    };
  } else if ('nodes' in input && 'edges' in input) {
    // Object with nodes and edges
    flowData = input;
  } else {
    toast.error("Format data tidak valid untuk ekspor");
    return;
  }

  const dataStr = JSON.stringify(flowData);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const exportFileDefaultName = 'flowchart-export.json';
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  toast.success("Diagram berhasil diexport");
};

/**
 * Imports flow chart data from JSON string
 */
export const importFromJsonString = (
  jsonString: string
): { nodes: Node[]; edges: Edge[] } | null => {
  try {
    const flowData = JSON.parse(jsonString);
    
    if (flowData && flowData.nodes && flowData.edges) {
      return {
        nodes: flowData.nodes,
        edges: flowData.edges
      };
    } else {
      toast.error("Format JSON tidak valid");
      return null;
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
    toast.error("Gagal memproses data JSON");
    return null;
  }
};

/**
 * Imports flow chart data from JSON file
 */
export const importFromJson = (
  file: File,
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  onImportSuccess?: () => void,
  onHeaderUpdate?: (nodeId: string, newTitle: string, newColor: string) => void
) => {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    try {
      const result = event.target?.result;
      if (typeof result === 'string') {
        const flowData = importFromJsonString(result);
        
        if (flowData) {
          // Apply onHeaderUpdate function to header nodes if provided
          if (onHeaderUpdate) {
            const updatedNodes = flowData.nodes.map((node: Node) => {
              if (node.data && node.data.isHeader) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    onHeaderUpdate
                  }
                };
              }
              return node;
            });
            setNodes(updatedNodes);
          } else {
            setNodes(flowData.nodes);
          }
          
          setEdges(flowData.edges);
          toast.success("Diagram berhasil diimport");
          if (onImportSuccess) onImportSuccess();
        }
      }
    } catch (error) {
      console.error('Error importing flow data:', error);
      toast.error("Gagal mengimport diagram");
    }
  };
  
  reader.onerror = () => {
    toast.error("Gagal membaca file");
  };
  
  reader.readAsText(file);
};

/**
 * Save flow chart to localStorage
 */
export const saveToLocalStorage = (nodes: Node[], edges: Edge[]) => {
  const flowData = {
    nodes: nodes.filter(node => !node.data.isHeader),
    edges
  };
  localStorage.setItem('flowChart', JSON.stringify(flowData));
  toast.success("Diagram berhasil disimpan");
};

/**
 * Export all pages to JSON
 */
export const exportAllPagesToJson = (pages: Array<{ id: string; title: string; nodes: Node[]; edges: Edge[] }>) => {
  const dataStr = JSON.stringify(pages);
  const dataUri =
    'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const exportFileDefaultName = 'flowchart-all-pages.json';
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  toast.success("Semua halaman berhasil diexport");
};
