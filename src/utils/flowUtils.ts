
import { Edge, Node, NodeChange, EdgeChange, Connection, applyNodeChanges, applyEdgeChanges, MarkerType } from 'reactflow';
import { toast } from 'sonner';

/**
 * Handles the deletion of an edge
 */
export const handleDeleteEdge = (
  edgeId: string, 
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>, 
  saveCurrentState: () => void
) => {
  saveCurrentState();
  setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
  toast.success('Koneksi berhasil dihapus');
};

/**
 * Applies changes to nodes and handles non-position changes that require state saving
 */
export const handleNodesChange = (
  changes: NodeChange[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  saveCurrentState: () => void
) => {
  const nonPositionChanges = changes.filter(
    change => change.type !== 'position' && change.type !== 'select'
  );
  
  if (nonPositionChanges.length > 0) {
    saveCurrentState();
  }
  
  setNodes(nds => applyNodeChanges(changes, nds));
};

/**
 * Applies changes to edges and handles non-select changes that require state saving
 */
export const handleEdgesChange = (
  changes: EdgeChange[],
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  saveCurrentState: () => void
) => {
  const nonSelectChanges = changes.filter(change => change.type !== 'select');
  
  if (nonSelectChanges.length > 0) {
    saveCurrentState();
  }
  
  setEdges(eds => {
    // First apply the changes
    const updatedEdges = applyEdgeChanges(changes, eds);
    // Then ensure all edges use smoothstep type and maintain animated property
    return updatedEdges.map(edge => ({
      ...edge,
      type: 'smoothstep',
      animated: edge.animated === false ? false : true
    }));
  });
};

/**
 * Creates a connection between nodes
 */
export const handleConnect = (
  params: Connection,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  saveCurrentState: () => void,
  handleDeleteEdge: (edgeId: string) => void
) => {
  saveCurrentState();
  setEdges(eds => addEdge({ 
    ...params, 
    animated: true,
    type: 'smoothstep',
    style: { strokeWidth: 2, stroke: '#555' },
    data: { 
      label: 'Hubungan',
      onDelete: handleDeleteEdge
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#555'
    }
  }, eds));
  toast.success('Elemen berhasil dihubungkan');
};

/**
 * Creates a new edge object for edge updates
 */
export const createEdgeWithDeleteHandler = (edge: Edge, deleteHandler: (edgeId: string) => void): Edge => {
  return {
    ...edge,
    type: 'smoothstep',
    animated: edge.animated === false ? false : true,
    data: {
      ...edge.data,
      onDelete: deleteHandler
    }
  };
};

// Helper function needed by addEdge function
export const addEdge = (edgeParams: Edge | Connection, edges: Edge[]): Edge[] => {
  if (!edgeParams.source || !edgeParams.target) return edges;
  
  const newEdge = {
    id: `e${edgeParams.source}-${edgeParams.target}-${Date.now()}`,
    source: edgeParams.source,
    target: edgeParams.target,
    type: 'smoothstep',
    animated: edgeParams.animated === false ? false : true,
    ...edgeParams
  };

  return [...edges, newEdge as Edge];
};
