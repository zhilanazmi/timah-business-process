
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
  // Gunakan getSmoothStepPath untuk edge yang lebih mulus
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    // Hapus properti curvature yang tidak valid
  });

  const onEdgeClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    evt.stopPropagation();
    if (data?.onEdgeClick) {
      data.onEdgeClick(id);
    }
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {selected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <Button 
              variant="destructive" 
              size="sm" 
              className="h-6 w-6 p-0 rounded-full" 
              onClick={(event) => onEdgeClick(event, id)}
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
