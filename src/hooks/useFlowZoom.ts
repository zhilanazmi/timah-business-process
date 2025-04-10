
import { useCallback } from 'react';

/**
 * Custom hook for handling flow zoom operations
 */
export const useFlowZoom = (reactFlowInstance: React.MutableRefObject<any>) => {
  // Zoom in
  const handleZoomIn = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.zoomIn();
    }
  }, [reactFlowInstance]);

  // Zoom out
  const handleZoomOut = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.zoomOut();
    }
  }, [reactFlowInstance]);

  // Fit view
  const handleFitView = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView();
    }
  }, [reactFlowInstance]);

  return {
    handleZoomIn,
    handleZoomOut,
    handleFitView
  };
};
