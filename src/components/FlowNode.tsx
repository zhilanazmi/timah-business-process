
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const FlowNode = ({ data, isConnectable }: NodeProps) => {
  // For header nodes, render a special header style
  if (data.isHeader) {
    return (
      <div className={`p-2 text-center text-white font-bold rounded-md shadow-md ${data.color || 'bg-blue-900'} w-[180px]`}>
        {data.label}
      </div>
    );
  }

  return (
    <div className="p-3 rounded-md shadow-md bg-white border-2 w-[180px] hover:border-blue-400 transition-colors">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500"
      />
      <div className="font-medium text-sm">{data.label}</div>
      {data.description && (
        <div className="text-xs text-gray-500 mt-1 truncate">
          {data.description}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500"
      />
    </div>
  );
};

export default memo(FlowNode);
