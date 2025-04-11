
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
    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-100 to-blue-50 rounded-md mb-2 shadow-sm">
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          onClick={onAddNode} 
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 transition-colors"
          title="Tambah Elemen (Ctrl+N)"
        >
          <Plus size={16} />
          Tambah Elemen
        </Button>
        <Button 
          size="sm" 
          onClick={onAddColumn} 
          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 transition-colors"
          title="Tambah Kolom (Ctrl+Shift+C)"
        >
          <Columns size={16} />
          Tambah Kolom
        </Button>
        <div className="border-l border-gray-300 h-6 mx-2"></div>
        <Button
          size="sm"
          variant="outline"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className={`transition-opacity ${!canUndo ? 'opacity-50' : 'hover:bg-gray-200'}`}
        >
          <Undo size={16} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Shift+Z or Ctrl+Y)"
          className={`transition-opacity ${!canRedo ? 'opacity-50' : 'hover:bg-gray-200'}`}
        >
          <Redo size={16} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onShowShortcuts}
          title="Bantuan Shortcut (Tekan ?)"
          className="ml-2 hover:bg-blue-100 text-blue-600"
        >
          <HelpCircle size={16} />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onExport}
          title="Export (Ctrl+E)"
          className="hover:bg-blue-50 border-blue-200"
        >
          <Upload size={16} className="mr-1" />
          Export
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onImport}
          title="Import (Ctrl+I)"
          className="hover:bg-blue-50 border-blue-200"
        >
          <Download size={16} className="mr-1" />
          Import
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onSaveAsImage}
          title="Simpan sebagai Gambar (Ctrl+Shift+S)"
          className="hover:bg-green-50 border-green-200 text-green-700"
        >
          <ImageDown size={16} className="mr-1" />
          Simpan Gambar
        </Button>
      </div>
    </div>
  );
};

export default FlowToolbar;
