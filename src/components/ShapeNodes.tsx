import { memo, useState } from 'react';
import { Handle, Position, NodeResizer, NodeProps } from 'reactflow';

// Type definition for shape nodes
type ShapeNodeData = {
  label: string;
  description?: string;
  details?: Record<string, string>;
  rightPathLabel?: string; // For diamond nodes
  bottomPathLabel?: string; // For diamond nodes
};

type ShapeNodeProps = Omit<NodeProps, 'data'> & {
  data: ShapeNodeData;
};

// Terminator Node (Rounded rectangle)
export const TerminatorNode = memo(({ data, isConnectable, selected }: ShapeNodeProps) => {
  return (
    <div className="relative inline-block">
        {/* Top handle - both input and output */}
      <Handle
        type="target"  // Input handle
        position={Position.Top}
        id="top-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="source"  // Output handle (overlapping with input)
        position={Position.Top}
        id="top-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Left handle - both input and output */}
      <Handle
        type="target"  // Input handle
        position={Position.Left}
        id="left-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ left: 0, top: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="source"  // Output handle (overlapping with input)
        position={Position.Left}
        id="left-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ left: 0, top: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      <div className="min-w-[50px] px-2 py-2 rounded-full shadow-md border-2 bg-amber-100 border-amber-300 hover:border-amber-400 transition-colors">
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

      {/* Right handle - both input and output */}
      <Handle
        type="target"  // Input handle
        position={Position.Right}
        id="right-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ right: 0, top: '50%', transform: 'translate(50%, -50%)' }}
      />
      <Handle
        type="source"  // Output handle (overlapping with input)
        position={Position.Right}
        id="right-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ right: 0, top: '50%', transform: 'translate(50%, -50%)' }}
      />

      {/* Bottom handle - both input and output */}
      <Handle
        type="target"  // Input handle
        position={Position.Bottom}
        id="bottom-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
      <Handle
        type="source"  // Output handle (overlapping with input)
        position={Position.Bottom}
        id="bottom-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
    </div>
  );
});


// Diamond Node (Decision)
export const DiamondNode = memo(({ data, isConnectable, selected }: ShapeNodeProps) => {
  const width = 150;
  const height = 100;

  return (
    <div className="relative" style={{ width, height }}>
      <svg width={width} height={height}>
        <polygon
          points={`${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2}`}
          className="fill-violet-100 stroke-violet-300 stroke-2 hover:stroke-violet-400 transition-colors"
        />
      </svg>

      <NodeResizer
        minWidth={100}
        minHeight={60}
        isVisible={selected}
        lineClassName="border-purple-400"
        handleClassName="h-3 w-3 bg-white border-2 border-purple-400"
      />

      {/* Handle atas - both input and output */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-500 hover:!bg-gray-700"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-500 hover:!bg-gray-700"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Handle kanan - both input and output */}
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-500 hover:!bg-gray-700"
        style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-500 hover:!bg-gray-700"
        style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}
      />
      <div className="absolute right-[-20px] top-[50%] -translate-y-1/2">
        <span className="text-xs font-medium text-red-700 block whitespace-nowrap">
          {data.rightPathLabel || "No"}
        </span>
      </div>

      {/* Handle bawah - both input and output */}
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-500 hover:!bg-gray-700"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-500 hover:!bg-gray-700"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
      <div className="absolute bottom-[-20px] left-[50%] -translate-x-1/2">
        <span className="text-xs font-medium text-green-700 block">
          {data.bottomPathLabel || "Yes"}
        </span>
      </div>

      {/* Tambahkan handle kiri - both input and output */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-500 hover:!bg-gray-700"
        style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-gray-500 hover:!bg-gray-700"
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


// Document Node type extension
type DocumentNodeData = {
  label: string;
  description?: string;
  details?: Record<string, string>;
  width?: number;
  height?: number;
  onResize?: (nodeId: string, width: number, height: number) => void;
};

type DocumentNodeProps = Omit<NodeProps, 'data'> & {
  data: DocumentNodeData;
};

// Document Node
export const DocumentNode = memo(({ data, isConnectable, selected, id }: DocumentNodeProps) => {
  const handleResize = (width: number, height: number) => {
    // Update the node data with new dimensions
    if (data.onResize) {
      data.onResize(id, width, height);
    }
  };

  return (
    <div 
      className="relative inline-block" 
      style={{ 
        width: data.width || 180,
        height: data.height || 90
      }}
    >
      <NodeResizer 
        minWidth={120}
        minHeight={70}
        isVisible={selected}
        lineClassName="border-indigo-400"
        handleClassName="h-4 w-4 bg-white border-2 border-indigo-400"
        onResize={(event, params) => {
          handleResize(params.width, params.height);
        }}
      />

      <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
        <path 
          d="M100,0 L0,0 L0,45 Q40,55 65,40 Q80,35 100,45 Z" 
          fill="#FFF085" 
          stroke="#FCB454" 
          strokeWidth="2"
        />
      </svg>

      <div className="absolute inset-0 p-3 flex flex-col justify-center pointer-events-none">
        <div className="font-medium text-sm truncate text-center">{data.label}</div>
        {data.description && (
          <div className="text-xs text-gray-600 mt-1 line-clamp-2">
            {data.description}
          </div>
        )}
        {data.details?.["Process Owner"] && (
          <div className="text-xs bg-gray-200 px-1.5 py-0.5 rounded mt-1 inline-block truncate max-w-full">
            {data.details["Process Owner"]}
          </div>
        )}
      </div>

      {/* Top handles - both input and output */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Left handles - both input and output */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ left: 0, top: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ left: 0, top: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Right handles - both input and output */}
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ right: 0, top: '50%', transform: 'translate(50%, -50%)' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ right: 0, top: '50%', transform: 'translate(50%, -50%)' }}
      />
      
      {/* Bottom handles - both input and output */}
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        isConnectable={isConnectable}
        className="!absolute w-2.5 h-2.5 rounded-full !bg-gray-500 hover:!bg-gray-700"
        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
      />
    </div>
  );
});