
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from 'reactflow';

/**
 * Custom edge component with a delete button that appears when the edge is selected
 */
const ButtonEdge = ({ 
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY, 
  sourcePosition, 
  targetPosition, 
  style = {}, 
  markerEnd, 
  data,
  selected
}: EdgeProps) => {
  // Get a smooth step path instead of a bezier path
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.25 // Add curvature for smoother edges
  });

  const onEdgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data && data.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <>
      <path 
        id={id} 
        style={{...style, strokeDasharray: style.strokeDasharray || 'none'}} 
        className="react-flow__edge-path" 
        d={edgePath} 
        markerEnd={markerEnd}
      />
      {selected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              zIndex: 1,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <button
              onClick={onEdgeClick}
              className="w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-300 shadow-sm hover:bg-red-100 hover:border-red-300 transition-colors"
              title="Delete connection"
            >
              ×
            </button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default ButtonEdge;
