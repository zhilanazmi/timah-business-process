
import { useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { Pencil, Lock, Unlock } from 'lucide-react';

interface ColumnHeaderProps extends NodeProps {
  data: {
    label: string;
    isHeader: boolean;
    column: string;
    color: string;
    locked?: boolean;
    onEdit?: (columnId: string) => void;
    onToggleLock?: (columnId: string) => void;
  };
}

const ColumnHeader = ({ data, id }: ColumnHeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onEdit) {
      data.onEdit(data.column);
    }
  };
  
  const handleLockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onToggleLock) {
      data.onToggleLock(data.column);
    }
  };

  return (
    <div
      className="px-4 py-2 rounded-md shadow-md font-bold text-white cursor-move flex items-center justify-between"
      style={{ backgroundColor: data.color, width: '180px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>{data.label}</div>
      
      {isHovered && (
        <div className="flex items-center space-x-1">
          <button 
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            onClick={handleEditClick}
            title="Edit kolom"
          >
            <Pencil size={14} />
          </button>
          <button 
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            onClick={handleLockClick}
            title={data.locked ? "Buka kunci kolom" : "Kunci kolom"}
          >
            {data.locked ? <Lock size={14} /> : <Unlock size={14} />}
          </button>
        </div>
      )}
      
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ opacity: 0 }}
      />
    </div>
  );
};

export default ColumnHeader;
