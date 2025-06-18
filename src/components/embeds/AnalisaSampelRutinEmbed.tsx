import React from 'react';
import { Node } from 'reactflow';
import EmbeddableFlowChart from '../EmbeddableFlowChart';
import analisaSampelRutinFlow from '../../data/flows/analisaSampelRutin';

interface AnalisaSampelRutinEmbedProps {
  height?: string | number;
  width?: string | number;
  showControls?: boolean;
  showMiniMap?: boolean;
  showBackground?: boolean;
  interactive?: boolean;
  showTitle?: boolean;
  showHeaders?: boolean;
  showHandlesToggle?: boolean;
  className?: string;
}

const AnalisaSampelRutinEmbed: React.FC<AnalisaSampelRutinEmbedProps> = ({
  height = '600px',
  width = '100%',
  showControls = true,
  showMiniMap = false,
  showBackground = true,
  interactive = false, // Default to read-only for embeds
  showTitle = true,
  showHeaders = true,
  showHandlesToggle = true, // Enable handles toggle by default
  className = '',
}) => {
  const flowData = analisaSampelRutinFlow.defaultPages[0];
  const columns = analisaSampelRutinFlow.initialColumns;
  
  // Include header nodes along with process nodes if enabled
  const allNodes: Node[] = [
    // Header nodes (only if showHeaders is true)
    ...(showHeaders ? columns.map((column, index) => ({
      id: `header-${column.id}`,
      type: 'customNode',
      position: { x: 10 + (index * 280), y: 10 },
      data: {
        label: column.title,
        isHeader: true,
        column: column.id,
        color: column.color
      },
      draggable: false,
      width: 180,
      height: 40
    })) : []),
    // Process nodes
    ...flowData.nodes
  ];
  
  return (
    <EmbeddableFlowChart
      initialNodes={allNodes}
      initialEdges={flowData.edges}
      title={showTitle ? analisaSampelRutinFlow.title : undefined}
      height={height}
      width={width}
      showControls={showControls}
      showMiniMap={showMiniMap}
      showBackground={showBackground}
      interactive={interactive}
      showHandles={false} // Default to hidden handles
      showHandlesToggle={interactive && showHandlesToggle} // Toggle only in interactive mode
      className={className}
    />
  );
};

export default AnalisaSampelRutinEmbed; 