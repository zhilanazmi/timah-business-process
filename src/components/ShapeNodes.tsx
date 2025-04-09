
import { memo, useState } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

// Terminator Node (Rounded rectangle)
export const TerminatorNode = memo(({ data, isConnectable, selected }: any) => {
  return (
    <div className="relative inline-block">
      {/* Top handles - now both source and target */}
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      <div className="min-w-[50px] px-2 py-2 rounded-full shadow-md border-2 bg-yellow-50 border-yellow-200 hover:border-yellow-400 transition-colors">
        <NodeResizer 
          minWidth={150}
          minHeight={40}
          isVisible={selected}
          lineClassName="border-blue-400"
          handleClassName="h-3 w-3 bg-white border-2 border-blue-400"
        />

        {/* Konten teks */}
        <div className="font-medium text-sm text-center px-8 py-2 min-w-[150px]">
          {data.label}
          {data.description && (
            <div className="text-xs text-gray-600 mt-1 line-clamp-2">
              {data.description}
            </div>
          )}
          {data.details?.["Process Owner"] && (
            <div className="text-xs bg-gray-100 px-0.5 py-0.5 rounded mt-1.5 inline-block">
              {data.details["Process Owner"]}
            </div>
          )}
        </div>
      </div>

      {/* Bottom handles - now both source and target */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
      
      {/* Left handles */}
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ left: 0, top: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ left: 0, top: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Right handles */}
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ right: 0, top: '50%', transform: 'translate(50%, -50%)' }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ right: 0, top: '50%', transform: 'translate(50%, -50%)' }}
      />
    </div>
  );
});


// Diamond Node (Decision)
export const DiamondNode = memo(({ data, isConnectable, selected }: any) => {
  const width = 150;
  const height = 100;

  return (
    <div className="relative" style={{ width, height }}>
      <svg width={width} height={height}>
        <polygon
          points={`${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2}`}
          className="fill-purple-50 stroke-purple-200 stroke-2 hover:stroke-purple-400 transition-colors"
        />
      </svg>

      <NodeResizer
        minWidth={100}
        minHeight={60}
        isVisible={selected}
        lineClassName="border-purple-400"
        handleClassName="h-3 w-3 bg-white border-2 border-purple-400"
      />

      {/* Handles for all positions - each position now has both source and target */}
      {/* Top handles */}
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Right handles */}
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}
      />
      <div className="absolute right-[-20px] top-[50%] -translate-y-1/2">
        <span className="text-xs font-medium text-red-600 block whitespace-nowrap">
          {data.rightPathLabel || "No"}
        </span>
      </div>

      {/* Bottom handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
      <div className="absolute bottom-[-20px] left-[50%] -translate-x-1/2">
        <span className="text-xs font-medium text-green-600 block">
          {data.bottomPathLabel || "Yes"}
        </span>
      </div>

      {/* Left handles */}
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-400 hover:!bg-blue-600"
        style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}
      />

      {/* Konten teks */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-2">
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
    </div>
  );
});


// Document Node
export const DocumentNode = memo(({ data, isConnectable, selected }: any) => {
  return (
    <div 
      className="relative inline-block" 
      style={{ 
        width: data.width || 180, // Increased default width
        height: data.height || 90  // Increased default height
      }}
    >
      <NodeResizer 
        minWidth={120} // Increased minimum width
        minHeight={70} // Increased minimum height
        isVisible={selected}
        lineClassName="border-cyan-400"
        handleClassName="h-4 w-4 bg-white border-2 border-cyan-400" // Larger handles
        onResize={(event, params) => {
          // Store size in node data if needed
          if (data.onResize) {
            data.onResize(params.width, params.height);
          }
        }}
      />

      {/* SVG Shape (flipped horizontal) */}
      <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
        <path 
          d="M100,0 L0,0 L0,45 Q40,55 65,40 Q80,35 100,45 Z" 
          fill="#ecfeff" 
          stroke="#a5f3fc" 
          strokeWidth="2"
        />
      </svg>

      {/* Content */}
      <div className="absolute inset-0 p-3 flex flex-col justify-center pointer-events-none">
        <div className="font-medium text-sm truncate text-center">{data.label}</div>
        {data.description && (
          <div className="text-xs text-gray-600 mt-1 line-clamp-2">
            {data.description}
          </div>
        )}
        {data.details?.["Process Owner"] && (
          <div className="text-xs bg-gray-100 px-1.5 py-0.5 rounded mt-1 inline-block truncate max-w-full">
            {data.details["Process Owner"]}
          </div>
        )}
      </div>

      {/* All Handles - each position now has both source and target */}
      {/* Top handles */}
      <Handle
        type="source"
        position={Position.Top}
        id="source-top"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Left handles */}
      <Handle
        type="source"
        position={Position.Left}
        id="source-left"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ left: 0, top: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ left: 0, top: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Right handles */}
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ right: 0, top: '50%', transform: 'translate(50%, -50%)' }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="target-right"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ right: 0, top: '50%', transform: 'translate(50%, -50%)' }}
      />
      
      {/* Bottom handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="target-bottom"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-400 hover:!bg-blue-600"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
    </div>
  );
});
