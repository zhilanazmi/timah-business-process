import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { ExternalLink, Edit2 } from 'lucide-react';
import ColumnHeaderEdit from './ColumnHeaderEdit';

const FlowNode = ({ data, isConnectable, selected, id }: NodeProps) => {
  const [isEditingHeader, setIsEditingHeader] = useState(false);

  // For header nodes, render a special header style with edit button
  if (data.isHeader) {
    const handleSaveHeader = (newTitle: string, newColor: string) => {
      if (data.onUpdateHeader) {
        data.onUpdateHeader(id, newTitle, newColor);
      }
    };

    return (
      <>
        <div className={`relative p-2 text-center text-white font-bold rounded-t-md shadow-md bg-gradient-to-r ${data.color || 'from-blue-800 to-blue-900'} w-[180px] select-none group`}>
          {data.label}
          <button
            onClick={() => setIsEditingHeader(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white/80 hover:text-white"
          >
            <Edit2 size={14} />
          </button>
        </div>
        <ColumnHeaderEdit
          isOpen={isEditingHeader}
          onClose={() => setIsEditingHeader(false)}
          onSave={handleSaveHeader}
          initialTitle={data.label}
          initialColor={data.color || 'from-blue-800 to-blue-900'}
        />
      </>
    );
  }

  // Determine node style based on type or category
  const getBgColor = () => {
    const column = data.column;
    switch(column) {
      case 'kolomsatu':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 hover:border-blue-400 hover:from-blue-100 hover:to-blue-200';
      case 'kolomdua':
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 hover:border-green-400 hover:from-green-100 hover:to-green-200';
      case 'kolomtiga':
        return 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300 hover:border-amber-400 hover:from-amber-100 hover:to-amber-200';
      case 'kolomempat':
        return 'bg-gradient-to-br from-red-50 to-red-100 border-red-300 hover:border-red-400 hover:from-red-100 hover:to-red-200';
      case 'kolomlima':
        return 'bg-gradient-to-br from-violet-50 to-violet-100 border-violet-300 hover:border-violet-400 hover:from-violet-100 hover:to-violet-200';
      case 'kolomenam':
        return 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-300 hover:border-teal-400 hover:from-teal-100 hover:to-teal-200';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 hover:border-gray-400 hover:from-gray-100 hover:to-gray-200';
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
    <div className={`p-3.5 rounded-md shadow-md hover:shadow-lg border-2 transition-all duration-200 ${nodeStyle} relative backdrop-blur-sm`}>
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
        style={{ width: 8, height: 8, background: '#6b7280', transition: 'all 0.2s ease' }}
        className="!border-2 hover:!bg-blue-500 hover:!border-blue-300"
        isConnectable={isConnectable}
      />
      
      {/* Left handle with unique ID */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ width: 8, height: 8, background: '#6b7280', transition: 'all 0.2s ease' }}
        className="!border-2 hover:!bg-blue-500 hover:!border-blue-300"
        isConnectable={isConnectable}
      />
      
      <div className="flex justify-between items-start gap-1">
        <div className="font-medium text-sm">{data.label}</div>
        {data.link && (
          <ExternalLink 
            size={14} 
            className="text-blue-500 hover:text-blue-700 hover:scale-110 flex-shrink-0 cursor-pointer transition-all" 
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
        <div className="text-xs bg-white/70 dark:bg-gray-700/30 px-1.5 py-0.5 rounded-full mt-1.5 inline-block shadow-sm border border-gray-200">
          {data.details["Process Owner"]}
        </div>
      )}
      
      {/* Right handle with unique ID */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ width: 8, height: 8, background: '#6b7280', transition: 'all 0.2s ease' }}
        className="!border-2 hover:!bg-blue-500 hover:!border-blue-300"
        isConnectable={isConnectable}
      />
      
      {/* Bottom handle with unique ID */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ width: 8, height: 8, background: '#6b7280', transition: 'all 0.2s ease' }}
        className="!border-2 hover:!bg-blue-500 hover:!border-blue-300"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(FlowNode);
