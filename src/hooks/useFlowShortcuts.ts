import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'sonner';

interface UseFlowShortcutsProps {
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
  onDuplicateNode: () => void;
  onCopyNode: () => void;
  onPasteNode: () => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  onNewPage?: () => void;
  canUndo: boolean;
  canRedo: boolean;
  selectedNode: any | null;
  hasNodeInClipboard?: boolean;
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
  onDuplicateNode,
  onCopyNode,
  onPasteNode,
  onPrevPage,
  onNextPage,
  onNewPage,
  canUndo,
  canRedo,
  selectedNode,
  hasNodeInClipboard
}: UseFlowShortcutsProps) => {
  // Add node shortcut (Ctrl+N)
  useHotkeys('ctrl+n', (e) => {
    e.preventDefault();
    onAddNode();
  }, { enableOnFormTags: true });

  // Add column shortcut (Ctrl+Shift+C)
  useHotkeys('ctrl+shift+c', (e) => {
    e.preventDefault();
    onAddColumn();
  }, { enableOnFormTags: true });

  // Undo shortcut (Ctrl+Z)
  useHotkeys('ctrl+z', (e) => {
    e.preventDefault();
    if (canUndo) {
      onUndo();
    } else {
      toast.info("Tidak ada tindakan yang dapat dibatalkan");
    }
  }, { enableOnFormTags: true });

  // Redo shortcuts (Ctrl+Shift+Z or Ctrl+Y)
  useHotkeys(['ctrl+shift+z', 'ctrl+y'], (e) => {
    e.preventDefault();
    if (canRedo) {
      onRedo();
    } else {
      toast.info("Tidak ada tindakan yang dapat diulangi");
    }
  }, { enableOnFormTags: true });

  // Duplicate node shortcut (Ctrl+D)
  useHotkeys('ctrl+d', (e) => {
    e.preventDefault();
    if (selectedNode && !selectedNode.data.isHeader) {
      onDuplicateNode();
    } else {
      toast.info("Pilih node terlebih dahulu untuk menduplikasi");
    }
  }, { enableOnFormTags: true });

  // Copy node shortcut (Ctrl+C)
  useHotkeys('ctrl+c', (e) => {
    // Only if we're not in an input field
    if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
      if (selectedNode && !selectedNode.data.isHeader) {
        e.preventDefault();
        onCopyNode();
      }
    }
  });

  // Paste node shortcut (Ctrl+V)
  useHotkeys('ctrl+v', (e) => {
    // Only if we're not in an input field
    if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
      if (hasNodeInClipboard) {
        e.preventDefault();
        onPasteNode();
      }
    }
  });

  // Export shortcut (Ctrl+E)
  useHotkeys('ctrl+e', (e) => {
    e.preventDefault();
    onExport();
  }, { enableOnFormTags: true });

  // Save as image shortcut (Ctrl+S)
  useHotkeys('ctrl+s', (e) => {
    e.preventDefault();
    onSaveAsImage();
  }, { enableOnFormTags: true });

  // Zoom in shortcut (Ctrl+ +)
  useHotkeys('ctrl+=', (e) => {
    e.preventDefault();
    onZoomIn();
  }, { enableOnFormTags: true });

  // Zoom out shortcut (Ctrl+ -)
  useHotkeys('ctrl+-', (e) => {
    e.preventDefault();
    onZoomOut();
  }, { enableOnFormTags: true });

  // Fit view shortcut (Ctrl+0)
  useHotkeys('ctrl+0', (e) => {
    e.preventDefault();
    onFitView();
  }, { enableOnFormTags: true });

  // Delete node shortcut (Delete or Backspace)
  useHotkeys(['delete', 'backspace'], (e) => {
    // Only if we're not in an input field
    if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
      if (selectedNode && !selectedNode.data.isHeader) {
        onDeleteSelectedNode();
      }
    }
  });

  // Show shortcuts dialog (?)
  useHotkeys('shift+/', (e) => {
    e.preventDefault();
    onShowShortcuts();
  }, { enableOnFormTags: true });

  // Previous page (Ctrl+Page Up)
  useHotkeys('ctrl+pageup', (e) => {
    e.preventDefault();
    if (onPrevPage) {
      onPrevPage();
    }
  }, { enableOnFormTags: true });

  // Next page (Ctrl+Page Down)
  useHotkeys('ctrl+pagedown', (e) => {
    e.preventDefault();
    if (onNextPage) {
      onNextPage();
    }
  }, { enableOnFormTags: true });

  // New page (Ctrl+T)
  useHotkeys('ctrl+t', (e) => {
    e.preventDefault();
    if (onNewPage) {
      onNewPage();
    }
  }, { enableOnFormTags: true });
};
