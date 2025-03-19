
import { Button } from '../ui/button';
import { Plus, Save, Download, Upload, Undo, Redo, Columns, ImageDown, HelpCircle, Lock, Unlock } from 'lucide-react';

interface FlowToolbarProps {
  onAddNode: () => void;
  onAddColumn: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onSaveAsImage: () => void;
  onShowShortcuts: () => void;
  onToggleInteractivity: () => void;
  interactionMode: 'edit' | 'view';
  canUndo: boolean;
  canRedo: boolean;
}

const FlowToolbar = ({
  onAddNode,
  onAddColumn,
  onUndo,
  onRedo,
  onSave,
  onExport,
  onImport,
  onSaveAsImage,
  onShowShortcuts,
  onToggleInteractivity,
  interactionMode,
  canUndo,
  canRedo
}: FlowToolbarProps) => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-100 rounded mb-2">
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          onClick={onAddNode} 
          className="flex items-center gap-1"
          title="Tambah Elemen (Ctrl+N)"
          disabled={interactionMode === 'view'}
        >
          <Plus size={16} />
          Tambah Elemen
        </Button>
        <Button 
          size="sm" 
          onClick={onAddColumn} 
          className="flex items-center gap-1"
          title="Tambah Kolom (Ctrl+Shift+C)"
          disabled={interactionMode === 'view'}
        >
          <Columns size={16} />
          Tambah Kolom
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onUndo}
          disabled={!canUndo || interactionMode === 'view'}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={16} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onRedo}
          disabled={!canRedo || interactionMode === 'view'}
          title="Redo (Ctrl+Shift+Z or Ctrl+Y)"
        >
          <Redo size={16} />
        </Button>
        <Button
          size="sm"
          variant={interactionMode === 'view' ? 'secondary' : 'outline'}
          onClick={onToggleInteractivity}
          title={`${interactionMode === 'edit' ? 'Mode Lihat' : 'Mode Edit'} (Ctrl+I)`}
          className="ml-2"
        >
          {interactionMode === 'edit' ? <Lock size={16} /> : <Unlock size={16} />}
          {interactionMode === 'edit' ? 'Kunci' : 'Edit'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onShowShortcuts}
          title="Bantuan Shortcut (Tekan ?)"
          className="ml-2"
        >
          <HelpCircle size={16} />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onSave}
          title="Simpan (Ctrl+S)"
        >
          <Save size={16} className="mr-1" />
          Simpan
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onExport}
          title="Export (Ctrl+E)"
        >
          <Download size={16} className="mr-1" />
          Export
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onImport}
          title="Import (Ctrl+I)"
        >
          <Upload size={16} className="mr-1" />
          Import
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onSaveAsImage}
          title="Simpan sebagai Gambar (Ctrl+Shift+S)"
        >
          <ImageDown size={16} className="mr-1" />
          Simpan Gambar
        </Button>
      </div>
    </div>
  );
};

export default FlowToolbar;
