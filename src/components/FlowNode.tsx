
import { memo } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { ExternalLink } from 'lucide-react';

const FlowNode = ({ data, isConnectable, selected }: NodeProps) => {
  // For header nodes, render a special header style
  if (data.isHeader) {
    return (
      <div className={`p-2 text-center text-white font-bold rounded-t-md shadow-md ${data.color || 'bg-blue-900'} w-[180px] select-none`}>
        {data.label}
      </div>
    );
  }

  // Determine node style based on type or category
  const getBgColor = () => {
    const column = data.column;
    switch(column) {
      case 'kolomsatu':
        return 'bg-blue-50 border-blue-200 hover:border-blue-400';
      case 'kolomdua':
        return 'bg-green-50 border-green-200 hover:border-green-400';
      case 'kolomtiga':
        return 'bg-amber-50 border-amber-200 hover:border-amber-400';
      case 'kolomempat':
        return 'bg-red-50 border-red-200 hover:border-red-400';
      case 'kolomlima':
        return 'bg-purple-50 border-purple-200 hover:border-purple-400';
      case 'kolomenam':
        return 'bg-teal-50 border-teal-200 hover:border-teal-400';
      default:
        return 'bg-white border-gray-200 hover:border-blue-400';
    }
  };

  const nodeStyle = getBgColor();
  
  // Create a function to open the link
  const handleLinkClick = (e: React.MouseEvent) => {
    if (data.link) {
      e.stopPropagation(); // Prevent node selection
      const url = data.link.startsWith('http') ? data.link : `https://${data.link}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`p-3.5 rounded-md shadow-md border-2 transition-colors ${nodeStyle} relative`}>
      <NodeResizer 
        minWidth={150}
        minHeight={40}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 border-blue-400"
      />
      
      {/* Top handle - now accepts both source and target connections */}
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={{ width: 8, height: 8, background: '#555', right: 'auto', left: '50%', transform: 'translateX(-50%)' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={{ width: 8, height: 8, background: '#555', right: 'auto', left: '50%', transform: 'translateX(-50%)' }}
        isConnectable={isConnectable}
      />
      
      {/* Left handle - now accepts both source and target connections */}
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{ width: 8, height: 8, background: '#555', top: '50%', transform: 'translateY(-50%)' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{ width: 8, height: 8, background: '#555', top: '50%', transform: 'translateY(-50%)' }}
        isConnectable={isConnectable}
      />
      
      <div className="flex justify-between items-start gap-1">
        <div className="font-medium text-sm">{data.label}</div>
        {data.link && (
          <ExternalLink 
            size={14} 
            className="text-blue-500 flex-shrink-0 cursor-pointer" 
            onClick={handleLinkClick}
            aria-label="Open link in new tab"
          />
        )}
      </div>
      
      {data.description && (
        <div className="text-xs text-gray-600 mt-1 line-clamp-2">
          {data.description}
        </div>
      )}
      
      {/* Tampilkan process owner jika ada */}
      {data.details?.["Process Owner"] && (
        <div className="text-xs bg-gray-100 px-1.5 py-0.5 rounded mt-1.5 inline-block">
          {data.details["Process Owner"]}
        </div>
      )}
      
      {/* Right handle - now accepts both source and target connections */}
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{ width: 8, height: 8, background: '#555', top: '50%', transform: 'translateY(-50%)' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{ width: 8, height: 8, background: '#555', top: '50%', transform: 'translateY(-50%)' }}
        isConnectable={isConnectable}
      />
      
      {/* Bottom handle - now accepts both source and target connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={{ width: 8, height: 8, background: '#555', left: '50%', transform: 'translateX(-50%)' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={{ width: 8, height: 8, background: '#555', left: '50%', transform: 'translateX(-50%)' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(FlowNode);
