
import FlowNode from '../FlowNode';
import { TerminatorNode, DiamondNode, DocumentNode } from '../ShapeNodes';
import ButtonEdge from '../edges/ButtonEdge';

/**
 * Node types mapping for ReactFlow
 */
export const nodeTypes = {
  customNode: FlowNode,
  terminatorNode: TerminatorNode,
  diamondNode: DiamondNode,
  documentNode: DocumentNode,
};

/**
 * Edge types mapping for ReactFlow
 */
export const edgeTypes = {
  buttonEdge: ButtonEdge,
  smoothstep: ButtonEdge, // Register the smoothstep type to use our custom edge
};
