
import { Button } from '../ui/button';
import { Plus, Save, Download, Upload, Undo, Redo, Columns, ImageDown, HelpCircle } from 'lucide-react';

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
        >
          <Plus size={16} />
          Tambah Elemen
        </Button>
        <Button 
          size="sm" 
          onClick={onAddColumn} 
          className="flex items-center gap-1"
          title="Tambah Kolom (Ctrl+Shift+C)"
        >
          <Columns size={16} />
          Tambah Kolom
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={16} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Shift+Z or Ctrl+Y)"
        >
          <Redo size={16} />
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
        {/* <Button
          size="sm"
          variant="outline"
          onClick={onSave}
          title="Simpan (Ctrl+S)"
        >
          <Save size={16} className="mr-1" />
          Simpan
        </Button> */}
        <Button
          size="sm"
          variant="outline"
          onClick={onExport}
          title="Export (Ctrl+E)"
        >
          <Upload size={16} className="mr-1" />
          Export
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onImport}
          title="Import (Ctrl+I)"
        >
          <Download size={16} className="mr-1" />
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
