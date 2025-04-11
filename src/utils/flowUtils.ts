
import { Connection, Edge, EdgeChange, MarkerType, Node, NodeChange, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

// Function untuk menangani perubahan node
export const onNodesChange = (changes: NodeChange[], nodes: Node[]) => {
  return applyNodeChanges(changes, nodes);
};

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
    // Hanya menambahkan animated jika ini adalah Edge, bukan Connection
    ...(Object.prototype.hasOwnProperty.call(params, 'animated') ? { animated: params.animated } : {}),
  };

  return [...edges, newEdge];
};

// Function untuk menangani perubahan nodes dengan saveState callback
export const handleNodesChange = (changes: NodeChange[], setNodes: React.Dispatch<React.SetStateAction<Node[]>>, saveState: () => void) => {
  setNodes((nds) => {
    const updatedNodes = applyNodeChanges(changes, nds);
    
    // Only save state for non-selection changes
    const hasNonSelectionChanges = changes.some(change => change.type !== 'select');
    if (hasNonSelectionChanges) {
      setTimeout(saveState, 0);
    }
    
    return updatedNodes;
  });
};

// Function untuk menangani perubahan edges dengan saveState callback
export const handleEdgesChange = (changes: EdgeChange[], setEdges: React.Dispatch<React.SetStateAction<Edge[]>>, saveState: () => void) => {
  setEdges((eds) => {
    const updatedEdges = applyEdgeChanges(changes, eds);
    
    // Only save state for non-selection changes
    const hasNonSelectionChanges = changes.some(change => change.type !== 'select');
    if (hasNonSelectionChanges) {
      setTimeout(saveState, 0);
    }
    
    return updatedEdges;
  });
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

// Membuat node baru
export const createNode = (
  nodeType: string,
  position: { x: number; y: number },
  label: string = 'Node Baru',
  column: string = ''
) => {
  const id = `node_${uuidv4()}`;

  // Basis node properties
  const baseNodeProps = {
    id,
    position,
    data: { 
      label,
      column
    },
    draggable: true,
  };

  // Sesuaikan berdasarkan tipe node
  switch (nodeType) {
    case 'terminator':
      return {
        ...baseNodeProps,
        type: 'terminator',
        style: { width: 150, height: 60 },
      };
    case 'diamond':
      return {
        ...baseNodeProps,
        type: 'diamond',
        style: { width: 150, height: 100 },
      };
    case 'document':
      return {
        ...baseNodeProps,
        type: 'document',
        data: { 
          ...baseNodeProps.data, 
          width: 180, 
          height: 90,
          onResize: (width: number, height: number) => {
            // Atur ukuran document node
          }
        },
      };
    default:
      return {
        ...baseNodeProps,
        style: { width: 180, minHeight: 60 },
      };
  }
};

// Helper untuk membuat header node
export const createColumnHeaderNode = (columnId: string, title: string, position: { x: number; y: number }) => {
  return {
    id: `header_${columnId}`,
    position,
    type: 'default',
    data: { 
      label: title,
      isHeader: true,
      color: getColumnColor(columnId)
    },
    draggable: false,
  };
};

// Function untuk mendapatkan warna kolom
export const getColumnColor = (columnId: string) => {
  switch (columnId) {
    case 'kolomsatu':
      return 'bg-blue-800';
    case 'kolomdua':
      return 'bg-green-800';
    case 'kolomtiga':
      return 'bg-amber-800';
    case 'kolomempat':
      return 'bg-red-800';
    case 'kolomlima':
      return 'bg-purple-800';
    case 'kolomenam':
      return 'bg-teal-800';
    default:
      return 'bg-gray-800';
  }
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

// Function untuk meng-update data node
export const updateNodeData = (nodes: Node[], nodeId: string, newData: any) => {
  return nodes.map(node => 
    node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
  );
};

// Function untuk membuat grid kolom
export const createColumnGrid = (columns: any[]) => {
  const startX = 50;
  const spacing = 250;
  const startY = 50;
  
  let nodes: Node[] = [];
  
  columns.forEach((column, index) => {
    const x = startX + index * spacing;
    const headerId = `header_${column.id}`;
    
    // Buat node header
    nodes.push({
      id: headerId,
      position: { x, y: startY },
      type: 'default',
      data: { 
        label: column.title,
        isHeader: true,
        color: getColumnColor(column.id)
      },
      draggable: false,
    });
  });
  
  return nodes;
};

// Function untuk mendapatkan posisi node baru dalam kolom
export const getNodePosition = (columnIndex: number, nodeCount: number) => {
  const startX = 50;
  const spacing = 250;
  const startY = 130; // Di bawah header
  const verticalSpacing = 120;
  
  return {
    x: startX + columnIndex * spacing,
    y: startY + nodeCount * verticalSpacing
  };
};

// Function untuk menghitung node dalam kolom
export const countNodesInColumn = (nodes: Node[], columnId: string) => {
  return nodes.filter(node => !node.data.isHeader && node.data.column === columnId).length;
};

// Function untuk membuat ID kolom yang unik
export const generateColumnId = () => {
  return `kolom_${uuidv4().substring(0, 8)}`;
};
