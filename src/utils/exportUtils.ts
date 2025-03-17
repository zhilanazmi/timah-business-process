
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

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
        
        return checkClass(classStr, 'react-flow__controls') && 
                checkClass(classStr, 'react-flow__minimap') && 
                checkClass(classStr, 'react-flow__panel') &&
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
    })
    .catch((error) => {
      console.error('Error saat menyimpan gambar:', error);
      toast.error("Gagal menyimpan gambar: " + error.message);
      
      try {
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
