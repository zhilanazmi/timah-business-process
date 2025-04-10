
import { ReactFlowProvider, ReactFlow, Background, MiniMap, Controls, Panel, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes, edgeTypes } from './flowTypes';
import ZoomControls from './ZoomControls';
import { Node, Edge } from 'reactflow';

interface FlowContainerProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
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
    <ReactFlowProvider>
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
        onInit={onInit}
        fitView
        className="bg-gray-50"
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
            type: 'arrowclosed',
            width: 20,
            height: 20,
            color: '#555'
          }
        }}
      >
        <Controls />
        <MiniMap zoomable pannable nodeClassName={node => node.type} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="bottom-right" className="bg-white p-2 rounded shadow-sm">
          <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </Panel>
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default FlowContainer;
