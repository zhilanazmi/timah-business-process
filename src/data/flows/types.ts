import { Node, Edge } from 'reactflow';

export interface FlowPage {
  id: string;
  title: string;
  nodes: Node[];
  edges: Edge[];
}

export interface FlowColumn {
  id: string;
  title: string;
  color: string;
}

export interface FlowData {
  id: string;
  title: string;
  description: string;
  initialColumns: FlowColumn[];
  defaultPages: FlowPage[];
} 