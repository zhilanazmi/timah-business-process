
// This file is now just a re-export of all utility functions
// It ensures backward compatibility while we migrate to the new structure
import { Connection, Edge, EdgeChange, MarkerType, Node, NodeChange, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import * as flowUtils from './flow';

// Re-export everything from the new structure
export * from './flow';
