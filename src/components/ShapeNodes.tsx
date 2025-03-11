import { memo, useState } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

// Terminator Node (Rounded rectangle)
// Terminator Node (Rounded rectangle)
export const TerminatorNode = memo(({ data, isConnectable, selected }: any) => {
  return (
    <div className="p-3.5 rounded-full shadow-md border-2 bg-yellow-50 border-yellow-200 hover:border-yellow-400 transition-colors">
      <NodeResizer 
        minWidth={150}
        minHeight={40}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 border-blue-400"
      />
      
      {/* Top handle for target connections */}
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        isConnectable={isConnectable}
        className="w-2.5 h-2.5 !bg-gray-400 hover:!bg-blue-600"
      />
      
      {/* Left handle for target connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        isConnectable={isConnectable}
        className="w-2.5 h-2.5 !bg-gray-400 hover:!bg-blue-600"
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
      
      {/* Right handle for source connections */}
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        isConnectable={isConnectable}
        className="w-2.5 h-2.5 !bg-gray-400 hover:!bg-blue-600"
      />
      
      {/* Bottom handle for source connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        isConnectable={isConnectable}
        className="w-2.5 h-2.5 !bg-gray-400 hover:!bg-blue-600"
      />
    </div>
  );
});

// Diamond Node (Decision)
export const DiamondNode = memo(({ data, isConnectable, selected }: any) => {
  return (
    <div className="w-[150px] h-[150px] shadow-md border-2 bg-purple-50 border-purple-200 hover:border-purple-400 transition-colors transform rotate-45">
      <NodeResizer 
        minWidth={100}
        minHeight={100}
        isVisible={selected}
        lineClassName="border-purple-400"
        handleClassName="h-3 w-3 bg-white border-2 border-purple-400"
      />
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ transform: 'rotate(-45deg)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center -rotate-45">
        <div className="text-center p-2">
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
      </div>
      
      {/* Right handle (typically for "Yes" path) */}
      <div className="absolute right-[-8px] top-[60%] -translate-y-1/2">
        <span className="text-xs font-medium text-green-600 -rotate-45 block whitespace-nowrap">
          {data.rightPathLabel || "Yes"}
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="yes"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ transform: 'rotate(-45deg)' }}
      />
      
      {/* Bottom handle (typically for "No" path) */}
      <div className="absolute bottom-[-20px] left-[50%] -translate-x-1/2">
        <span className="text-xs font-medium text-red-600 -rotate-45 block">
          {data.bottomPathLabel || "No"}
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ transform: 'rotate(-45deg)' }}
      />
    </div>
  );
});

// Document Node
export const DocumentNode = memo(({ data, isConnectable, selected }: any) => {
  return (
    <div className="relative p-3.5 shadow-md border-2 bg-cyan-50 border-cyan-200 hover:border-cyan-400 transition-colors">
      <NodeResizer 
        minWidth={150}
        minHeight={80}
        isVisible={selected}
        lineClassName="border-cyan-400"
        handleClassName="h-3 w-3 bg-white border-2 border-cyan-400"
      />
      
      {/* Top handle for target connections - explicitly made more visible */}
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        isConnectable={isConnectable}
        className="w-2.5 h-2.5 !bg-gray-400 hover:!bg-blue-600"
      />
      
      {/* Left handle for target connections - explicitly made more visible */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        isConnectable={isConnectable}
        className="w-2.5 h-2.5 !bg-gray-400 hover:!bg-blue-600"
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
      
      {/* Right handle for source connections */}
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
      />
      
      {/* Bottom handle for source connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ bottom: "-10px" }}
      />
    </div>
  );
});