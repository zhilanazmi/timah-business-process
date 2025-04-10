
import { ReactFlow, Background, Controls, Panel, Edge, Node, OnNodesChange, OnEdgesChange, OnConnect, NodeTypes, EdgeTypes, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import ZoomControls from './ZoomControls';
import ButtonEdge from '../edges/ButtonEdge';

// Define node and edge types
const nodeTypes = {
  customNode: require('../FlowNode').default,
};

const edgeTypes = {
  buttonedge: ButtonEdge,
};

interface FlowContainerProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  onEdgeClick: (event: React.MouseEvent, edge: Edge) => void;
  onPaneClick: () => void;
  onNodeDragStop: () => void;
  onInit: (instance: any) => void;
  handleEdgeDelete: (edgeId: string) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const FlowContainer = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onEdgeClick,
  onPaneClick,
  onNodeDragStop,
  onInit,
  handleEdgeDelete,
  handleZoomIn,
  handleZoomOut
}: FlowContainerProps) => {
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
      onInit={onInit}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={{
        type: 'smoothstep',
        animated: true,
        style: { strokeWidth: 2, stroke: '#555' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#555'
        }
      }}
      fitView
      attributionPosition="bottom-right"
    >
      <Background pattern="dots" gap={12} size={1} />
      <Controls />
      <Panel position="top-right">
        <ZoomControls 
          onZoomIn={handleZoomIn} 
          onZoomOut={handleZoomOut} 
        />
      </Panel>
    </ReactFlow>
  );
};

export default FlowContainer;
