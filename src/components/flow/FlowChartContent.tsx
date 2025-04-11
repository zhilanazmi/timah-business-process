
import { useEffect, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  Panel,
  BackgroundVariant,
  Node,
  Edge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ZoomControls from './ZoomControls';
import { nodeTypes, edgeTypes } from './flowTypes';

interface FlowChartContentProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  onNodeClick: any;
  onEdgeClick: any;
  onPaneClick: any;
  onNodeDragStop: any;
  reactFlowInstance: React.MutableRefObject<any>;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleEdgeDelete: (edgeId: string) => void;
}

const FlowChartContent = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onEdgeClick,
  onPaneClick,
  onNodeDragStop,
  reactFlowInstance,
  handleZoomIn,
  handleZoomOut,
  handleEdgeDelete,
}: FlowChartContentProps) => {
  const updateEdgesWithStyles = (instance: any) => {
    if (!instance) return;
    
    const currentEdges = instance.getEdges();
    instance.setEdges(currentEdges.map((edge: Edge) => ({
      ...edge,
      type: 'smoothstep',
      animated: true,
      style: { 
        ...(edge.style || {}), 
        strokeWidth: 2, 
        stroke: '#555' 
      },
      markerEnd: edge.markerEnd || {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#555'
      }
    })));
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onEdgeClick={onEdgeClick}
      onPaneClick={onPaneClick}
      onNodeDragStop={onNodeDragStop}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onInit={(instance) => {
        reactFlowInstance.current = instance;
        updateEdgesWithStyles(instance);
      }}
      fitView
      className="bg-gray-50"
      minZoom={0.01}
      connectOnClick={true}
      deleteKeyCode={['Backspace', 'Delete']}
      multiSelectionKeyCode={['Control', 'Meta']}
      selectionKeyCode={['Shift']}
      defaultEdgeOptions={{
        type: 'smoothstep',
        animated: true,
        style: { strokeWidth: 2, stroke: '#555' },
        data: {
          onDelete: handleEdgeDelete
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#555'
        }
      }}
    >
      <Controls />
      <MiniMap zoomable pannable nodeClassName={node => node.type || ''} />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <Panel position="bottom-right" className="bg-white p-2 rounded shadow-sm">
        <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </Panel>
    </ReactFlow>
  );
};

export default FlowChartContent;
