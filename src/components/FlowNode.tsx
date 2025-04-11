
import { memo } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { ExternalLink } from 'lucide-react';

const FlowNode = ({ data, isConnectable, selected }: NodeProps) => {
  // For header nodes, render a special header style
  if (data.isHeader) {
    return (
      <div className={`p-3 text-center text-white font-bold rounded-t-md shadow-md ${data.color || 'bg-blue-900'} w-[180px] select-none transition-all duration-200`}>
        {data.label}
      </div>
    );
  }

  // Determine node style based on type or category
  const getBgColor = () => {
    const column = data.column;
    switch(column) {
      case 'kolomsatu':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-400 shadow-blue-100/50';
      case 'kolomdua':
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-400 shadow-green-100/50';
      case 'kolomtiga':
        return 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:border-amber-400 shadow-amber-100/50';
      case 'kolomempat':
        return 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:border-red-400 shadow-red-100/50';
      case 'kolomlima':
        return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:border-purple-400 shadow-purple-100/50';
      case 'kolomenam':
        return 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:border-teal-400 shadow-teal-100/50';
      default:
        return 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-400 shadow-gray-100/50';
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
    <div className={`p-3.5 rounded-md shadow-md border-2 transition-all duration-200 ${nodeStyle} relative ${selected ? 'ring-2 ring-blue-400' : ''}`}>
      <NodeResizer 
        minWidth={150}
        minHeight={40}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 border-blue-400"
      />
      
      {/* Top handle with unique ID */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ width: 8, height: 8, background: '#555' }}
        className="transition-all hover:w-10 hover:bg-blue-500"
        isConnectable={isConnectable}
      />
      
      {/* Left handle with unique ID */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ width: 8, height: 8, background: '#555' }}
        className="transition-all hover:h-10 hover:bg-blue-500"
        isConnectable={isConnectable}
      />
      
      <div className="flex justify-between items-start gap-1">
        <div className="font-medium text-sm">{data.label}</div>
        {data.link && (
          <ExternalLink 
            size={14} 
            className="text-blue-500 flex-shrink-0 cursor-pointer hover:text-blue-700 transition-colors" 
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
      
      {/* Right handle with unique ID */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ width: 8, height: 8, background: '#555' }}
        className="transition-all hover:h-10 hover:bg-blue-500"
        isConnectable={isConnectable}
      />
      
      {/* Bottom handle with unique ID */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ width: 8, height: 8, background: '#555' }}
        className="transition-all hover:w-10 hover:bg-blue-500"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(FlowNode);
