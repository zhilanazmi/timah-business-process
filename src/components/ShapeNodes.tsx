
import { memo } from 'react';
import { Handle, Position } from 'reactflow';

// Terminator Node (Rounded rectangle)
export const TerminatorNode = memo(({ data, isConnectable }: any) => {
  return (
    <div className="p-3.5 rounded-full shadow-md border-2 bg-yellow-50 border-yellow-200 hover:border-yellow-400 w-[180px] transition-colors">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
      />
      <div className="font-medium text-sm text-center">{data.label}</div>
      {data.description && (
        <div className="text-xs text-gray-600 mt-1 line-clamp-2 text-center">
          {data.description}
        </div>
      )}
      {data.details?.["Process Owner"] && (
        <div className="text-xs bg-gray-100 px-1.5 py-0.5 rounded mt-1.5 inline-block">
          {data.details["Process Owner"]}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
      />
    </div>
  );
});

// Diamond Node (Decision)
export const DiamondNode = memo(({ data, isConnectable }: any) => {
  return (
    <div className="p-3 shadow-md border-2 bg-purple-50 border-purple-200 hover:border-purple-400 w-[180px] h-[180px] transition-colors rotate-45 flex items-center justify-center">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600 rotate-[-45deg]"
      />
      <div className="-rotate-45 text-center">
        <div className="font-medium text-sm">{data.label}</div>
        {data.description && (
          <div className="text-xs text-gray-600 mt-1 line-clamp-2">
            {data.description}
          </div>
        )}
        {data.details?.["Process Owner"] && (
          <div className="text-xs bg-gray-100 px-1.5 py-0.5 rounded mt-1.5 inline-block">
            {data.details["Process Owner"]}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600 rotate-[-45deg]"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600 rotate-[-45deg]"
      />
      <Handle
        type="source"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600 rotate-[-45deg]"
      />
    </div>
  );
});

// Document Node
export const DocumentNode = memo(({ data, isConnectable }: any) => {
  return (
    <div className="relative p-3.5 shadow-md border-2 bg-cyan-50 border-cyan-200 hover:border-cyan-400 w-[180px] transition-colors">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
      />
      <div className="font-medium text-sm">{data.label}</div>
      {data.description && (
        <div className="text-xs text-gray-600 mt-1 line-clamp-2">
          {data.description}
        </div>
      )}
      {data.details?.["Process Owner"] && (
        <div className="text-xs bg-gray-100 px-1.5 py-0.5 rounded mt-1.5 inline-block">
          {data.details["Process Owner"]}
        </div>
      )}
      <div className="absolute bottom-[-10px] left-0 right-0 h-[20px] bg-cyan-50 border-x-2 border-cyan-200 
           after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 
           after:h-[10px] after:bg-white after:rounded-[50%_50%_0_0] after:border-b-0"></div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
      />
    </div>
  );
});
