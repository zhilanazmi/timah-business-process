import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  ConnectionMode,
  ReactFlowProvider,
  MarkerType,
} from 'reactflow';
import { Eye, EyeOff } from 'lucide-react';
import 'reactflow/dist/style.css';

// Import node types
import FlowNode from './FlowNode';
import { TerminatorNode, DiamondNode, DocumentNode } from './ShapeNodes';

const nodeTypes = {
  customNode: FlowNode,
  terminatorNode: TerminatorNode,
  diamondNode: DiamondNode,
  documentNode: DocumentNode,
};

interface EmbeddableFlowChartProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  title?: string;
  height?: string | number;
  width?: string | number;
  showControls?: boolean;
  showMiniMap?: boolean;
  showBackground?: boolean;
  interactive?: boolean;
  showHandles?: boolean;
  showHandlesToggle?: boolean;
  className?: string;
}

const EmbeddableFlowChart: React.FC<EmbeddableFlowChartProps> = ({
  initialNodes,
  initialEdges,
  title,
  height = '600px',
  width = '100%',
  showControls = true,
  showMiniMap = false,
  showBackground = true,
  interactive = true,
  showHandles = false,
  showHandlesToggle = false,
  className = '',
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [handlesVisible, setHandlesVisible] = useState(showHandles);

  const onConnect = useCallback(
    (params: Connection) => {
      if (interactive) {
        const newEdge = {
          ...params,
          type: 'smoothstep',
          animated: true,
          style: {
            strokeWidth: 2,
            stroke: '#555'
          },
          data: {
            label: 'Hubungan'
          },
          markerEnd: {
            type: MarkerType.ArrowClosed
          }
        };
        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    [setEdges, interactive]
  );

  return (
    <div className={`embeddable-flowchart ${className}`} style={{ height, width }}>
      {title && (
        <div className="mb-4 p-4 bg-white border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
      )}
      <style>
        {`
          ${!handlesVisible ? `
            .embeddable-flowchart .react-flow__handle {
              opacity: 0 !important;
              pointer-events: none !important;
              visibility: hidden !important;
            }
            .embeddable-flowchart .react-flow__handle-connecting {
              opacity: 0 !important;
            }
            .embeddable-flowchart .react-flow__handle-valid {
              opacity: 0 !important;
            }
          ` : ''}
          
          .handles-toggle-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            font-weight: 500;
            color: #374151;
            transition: all 0.2s ease;
            backdrop-filter: blur(4px);
          }
          
          .handles-toggle-btn:hover {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          
          /* Style for connection line while dragging */
          .embeddable-flowchart .react-flow__connection-line {
            stroke: #555 !important;
            stroke-width: 2px !important;
          }
          
          /* Style for temporary edge while connecting */
          .embeddable-flowchart .react-flow__edge.react-flow__edge-path {
            stroke: #555;
            stroke-width: 2;
          }
          
          /* Ensure new connections have animated style */
          .embeddable-flowchart .react-flow__edge-path {
            animation: dasharray 0.5s linear infinite;
          }
          
          @keyframes dasharray {
            to {
              stroke-dashoffset: -1000;
            }
          }
        `}
      </style>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={interactive ? onNodesChange : undefined}
          onEdgesChange={interactive ? onEdgesChange : undefined}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: {
              strokeWidth: 2,
              stroke: '#555'
            },
            markerEnd: {
              type: MarkerType.ArrowClosed
            }
          }}
          connectionLineStyle={{
            strokeWidth: 2,
            stroke: '#555',
          }}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          nodesDraggable={interactive}
          nodesConnectable={interactive}
          elementsSelectable={interactive}
          zoomOnScroll={interactive}
          panOnScroll={interactive}
          zoomOnPinch={interactive}
          panOnDrag={interactive}
          className="bg-gray-50"
          style={{
            '--handle-size': '0px',
            '--handle-border-width': '0px',
          } as React.CSSProperties}
        >
          {showBackground && <Background color="#f1f5f9" gap={20} />}
          {showControls && <Controls showInteractive={false} />}
          {showMiniMap && (
            <MiniMap
              nodeColor={(node) => {
                if (node.data?.isHeader) return '#1e40af';
                switch (node.type) {
                  case 'terminatorNode': return '#dc2626';
                  case 'diamondNode': return '#d97706';
                  case 'documentNode': return '#059669';
                  default: return '#6366f1';
                }
              }}
              maskColor="rgba(0, 0, 0, 0.1)"
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
              }}
            />
          )}
          
          {/* Handles Toggle Button (only in interactive mode) */}
          {interactive && showHandlesToggle && (
            <div 
              className="handles-toggle-btn"
              onClick={() => setHandlesVisible(!handlesVisible)}
              title={handlesVisible ? "Sembunyikan titik penghubung" : "Tampilkan titik penghubung"}
            >
              {handlesVisible ? <EyeOff size={14} /> : <Eye size={14} />}
              <span>{handlesVisible ? "Sembunyikan" : "Tampilkan"}</span>
            </div>
          )}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default EmbeddableFlowChart; 