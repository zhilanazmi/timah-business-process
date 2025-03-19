
import { useEffect } from 'react';

interface ShortcutsProps {
  onAddNode: () => void;
  onAddColumn: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: () => void;
  onSaveAsImage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onDeleteSelectedNode: () => void;
  onShowShortcuts: () => void;
  onToggleInteractivity: () => void;
  canUndo: boolean;
  canRedo: boolean;
  selectedNode: any | null;
}

export const useFlowShortcuts = ({
  onAddNode,
  onAddColumn,
  onUndo,
  onRedo,
  onSave,
  onExport,
  onSaveAsImage,
  onZoomIn,
  onZoomOut,
  onFitView,
  onDeleteSelectedNode,
  onShowShortcuts,
  onToggleInteractivity,
  canUndo,
  canRedo,
  selectedNode
}: ShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (activeElement && ['INPUT', 'TEXTAREA'].includes(activeElement.tagName)) {
        return;
      }

      const ctrlOrCmd = event.ctrlKey || event.metaKey;

      if (ctrlOrCmd && event.key === 'n') {
        event.preventDefault();
        onAddNode();
      }
      else if (ctrlOrCmd && event.shiftKey && event.key === 'c') {
        event.preventDefault();
        onAddColumn();
      }
      else if (ctrlOrCmd && !event.shiftKey && event.key === 'z' && canUndo) {
        event.preventDefault();
        onUndo();
      }
      else if ((ctrlOrCmd && event.shiftKey && event.key === 'z') || 
               (ctrlOrCmd && event.key === 'y')) {
        event.preventDefault();
        if (canRedo) onRedo();
      }
      else if (ctrlOrCmd && !event.shiftKey && event.key === 's') {
        event.preventDefault();
        onSave();
      }
      else if (ctrlOrCmd && event.key === 'e') {
        event.preventDefault();
        onExport();
      }
      else if (ctrlOrCmd && event.shiftKey && event.key === 's') {
        event.preventDefault();
        onSaveAsImage();
      }
      else if (ctrlOrCmd && (event.key === '+' || event.key === '=')) {
        event.preventDefault();
        onZoomIn();
      }
      else if (ctrlOrCmd && event.key === '-') {
        event.preventDefault();
        onZoomOut();
      }
      else if (ctrlOrCmd && event.key === '0') {
        event.preventDefault();
        onFitView();
      }
      else if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNode) {
        event.preventDefault();
        onDeleteSelectedNode();
      }
      else if (event.key === '?') {
        event.preventDefault();
        onShowShortcuts();
      }
      else if (ctrlOrCmd && event.key === 'i') {
        event.preventDefault();
        onToggleInteractivity();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    onAddNode, 
    onAddColumn, 
    onUndo, 
    onRedo, 
    canUndo, 
    canRedo,
    onSave, 
    onExport, 
    onSaveAsImage,
    onZoomIn, 
    onZoomOut, 
    onFitView, 
    selectedNode, 
    onDeleteSelectedNode, 
    onShowShortcuts,
    onToggleInteractivity
  ]);
};
