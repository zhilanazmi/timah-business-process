import { toPng } from 'html-to-image';
import { toast } from 'sonner';
import { Edge, Node } from 'reactflow';

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

  // Access the reactflow instance
  const rfNode = wrapperRef.current.querySelector('.react-flow') as any;
  const instance = rfNode?.__reactFlowInstance;
  
  if (instance) {
    // Before taking the image, get the bounds of all nodes to determine the exact area to capture
    const nodes = instance.getNodes();
    if (nodes.length === 0) {
      toast.error("Tidak ada node untuk disimpan");
      
      // Restore handles visibility
      handles.forEach((handle, index) => {
        (handle as HTMLElement).style.display = originalDisplayValues[index] || '';
      });
      return;
    }

    // Calculate the bounds of the content (all nodes)
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    // Find the min/max coordinates to get the actual content bounds
    nodes.forEach(node => {
      // Skip hidden nodes
      if (node.hidden) return;
      
      const x = node.position.x;
      const y = node.position.y;
      const width = node.width || 180; // Default node width if not specified
      const height = node.height || 80; // Default node height if not specified
      
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    });
    
    // Add some padding
    const padding = 50;
    minX -= padding;
    minY -= padding;
    maxX += padding;
    maxY += padding;
    
    // Get the SVG transform for the viewport
    const viewportEl = targetElement as HTMLElement;
    const transform = viewportEl.style.transform;
    const originalTransform = transform;
    
    // Set the viewport to focus exactly on our content area
    instance.setViewport({ 
      x: -minX, 
      y: -minY, 
      zoom: 1 
    });
    
    // Set a fixed width/height based on our content bounds
    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;
    
    setTimeout(() => {
      // Capture only the content area
      toPng(targetElement as HTMLElement, { 
        backgroundColor: '#ffffff',
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
        width: contentWidth,
        height: contentHeight,
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
          
          return checkClass(classStr, 'react-flow__controls') && 
                 checkClass(classStr, 'react-flow__minimap') && 
                 checkClass(classStr, 'react-flow__panel') &&
                 checkClass(classStr, 'react-flow__handle') && 
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
        
        // Restore the original viewport
        if (instance) {
          instance.fitView({ 
            padding: 0.2,
            includeHiddenNodes: false,
            minZoom: 0.1,
            maxZoom: 1.5
          });
        }
      })
      .catch((error) => {
        console.error('Error saat menyimpan gambar:', error);
        toast.error("Gagal menyimpan gambar: " + error.message);
        
        // Restore handles visibility even on error
        handles.forEach((handle, index) => {
          (handle as HTMLElement).style.display = originalDisplayValues[index] || '';
        });
        
        // Restore the original viewport
        if (instance) {
          instance.fitView({ 
            padding: 0.2,
            includeHiddenNodes: false,
            minZoom: 0.1,
            maxZoom: 1.5
          });
        }
        
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
  } else {
    toast.error("Tidak dapat mengakses instance diagram");
    
    // Restore handles visibility if instance not found
    handles.forEach((handle, index) => {
      (handle as HTMLElement).style.display = originalDisplayValues[index] || '';
    });
  }
};

/**
 * Exports the flow chart data as JSON
 */
export const exportToJson = (reactFlowInstance: any) => {
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

/**
 * Imports flow chart data from JSON file
 */
export const importFromJson = (
  file: File,
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  onImportSuccess?: () => void
) => {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    try {
      const result = event.target?.result;
      if (typeof result === 'string') {
        const flowData = JSON.parse(result);
        
        if (flowData && flowData.nodes && flowData.edges) {
          setNodes(flowData.nodes);
          setEdges(flowData.edges);
          toast.success("Diagram berhasil diimport");
          if (onImportSuccess) onImportSuccess();
        } else {
          toast.error("Format file tidak valid");
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
export const saveToLocalStorage = (nodes: any[], edges: any[]) => {
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
export const exportAllPagesToJson = (pages: any[]) => {
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
