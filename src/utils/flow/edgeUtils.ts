
import { Connection, Edge, EdgeChange, MarkerType, applyEdgeChanges } from 'reactflow';

// Function untuk menangani perubahan edge
export const onEdgesChange = (changes: EdgeChange[], edges: Edge[]) => {
  return applyEdgeChanges(changes, edges);
};

// Function untuk menambahkan edge baru
export const onConnect = (params: Connection, edges: Edge[]) => {
  // Cek apakah edge sudah ada
  const isDuplicate = edges.some(
    (edge) => edge.source === params.source && edge.target === params.target
  );

  if (isDuplicate) {
    return edges;
  }

  const id = `e${params.source}-${params.target}`;
  const newEdge = {
    id,
    source: params.source || '',
    target: params.target || '',
    type: 'buttonedge',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
    style: {
      strokeWidth: 2,
    },
    // Only use properties that exist on Connection type
    ...(params.animated ? { animated: params.animated } : {}),
  };

  return [...edges, newEdge];
};

// Function untuk menghapus edge
export const handleDeleteEdge = (edgeId: string, setEdges: React.Dispatch<React.SetStateAction<Edge[]>>, saveState: () => void) => {
  setEdges((eds) => {
    const newEdges = eds.filter(e => e.id !== edgeId);
    saveState();
    return newEdges;
  });
};

// Function untuk menangani koneksi dengan saveState callback dan delete handler
export const handleConnect = (
  params: Connection, 
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>, 
  saveState: () => void,
  onDelete: (edgeId: string) => void
) => {
  setEdges((eds) => {
    const newEdge = createEdgeWithDeleteHandler(params, onDelete);
    if (!newEdge) return eds;
    
    const newEdges = [...eds, newEdge];
    saveState();
    return newEdges;
  });
};

// Function untuk membuat edge dengan delete handler
export const createEdgeWithDeleteHandler = (params: Connection, onDelete: (edgeId: string) => void): Edge | null => {
  // Cek apakah source dan target valid
  if (!params.source || !params.target) return null;
  
  const id = `e${params.source}-${params.target}`;
  
  return {
    id,
    source: params.source,
    target: params.target,
    type: 'smoothstep',
    animated: true,
    style: { 
      strokeWidth: 2,
      stroke: '#555' 
    },
    data: {
      onDelete: () => onDelete(id)
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#555'
    }
  };
};

// Function untuk menambahkan animasi pada edge saat menghubungkan node
export const updateEdgeWithAnimation = (edge: Edge | Connection): Edge => {
  if ('id' in edge) {
    // Pastikan hanya menambahkan animated jika ini adalah Edge
    return {
      ...edge,
      animated: true,
    };
  }
  // Untuk Connection (bukan Edge), kembalikan edge tanpa animated
  return edge as Edge;
};

// Function untuk mendapatkan keterangan animasi edge
export const getAnimatedEdgeParams = (animated: boolean = false) => {
  return animated ? { animated: true } : {};
};
