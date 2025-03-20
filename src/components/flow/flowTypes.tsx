import CustomNode from './CustomNode';
import TerminatorNode from './TerminatorNode';
import DiamondNode from './DiamondNode';
import DocumentNode from './DocumentNode';
import ButtonEdge from './ButtonEdge';
import ColumnHeader from './ColumnHeader';

export const nodeTypes = {
  customNode: CustomNode,
  terminatorNode: TerminatorNode,
  diamondNode: DiamondNode,
  documentNode: DocumentNode,
  columnHeader: ColumnHeader,
};

export const edgeTypes = {
  buttonEdge: ButtonEdge,
};
