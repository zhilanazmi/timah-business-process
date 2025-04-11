
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, getSmoothStepPath } from 'reactflow';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

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
  selected,
}: EdgeProps) => {
  // Use getSmoothStepPath for smoother edges
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    evt.stopPropagation();
    if (data?.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{
        ...style,
        strokeWidth: 2,
        stroke: '#555',
      }} />
      {selected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              zIndex: 1000,
            }}
            className="nodrag nopan"
          >
            <Button 
              variant="destructive" 
              size="sm" 
              className="h-6 w-6 p-0 rounded-full shadow-md hover:shadow-lg transition-shadow" 
              onClick={(event) => onEdgeClick(event, id)}
              title="Hapus koneksi"
            >
              <X size={12} />
            </Button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default ButtonEdge;
