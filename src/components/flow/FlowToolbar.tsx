import { Button } from '../ui/button';
import { Plus, Save, Download, Upload, Undo, Redo, Columns, ImageDown, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

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
    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg shadow-sm mb-3 border border-gray-200">
      <TooltipProvider>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                onClick={onAddNode} 
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Tambah Elemen
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tambah Elemen (Ctrl+N)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                onClick={onAddColumn} 
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <Columns size={16} />
                Tambah Kolom
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tambah Kolom (Ctrl+Shift+C)</p>
            </TooltipContent>
          </Tooltip>
          
          <div className="flex items-center bg-gray-100 rounded-md p-0.5 ml-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onUndo}
                  disabled={!canUndo}
                  className={`rounded-r-none ${!canUndo ? 'opacity-50' : 'hover:bg-gray-200'}`}
                >
                  <Undo size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo (Ctrl+Z)</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onRedo}
                  disabled={!canRedo}
                  className={`rounded-l-none ${!canRedo ? 'opacity-50' : 'hover:bg-gray-200'}`}
                >
                  <Redo size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo (Ctrl+Shift+Z or Ctrl+Y)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={onShowShortcuts}
                className="ml-2 border-dashed border-gray-400 hover:bg-blue-50"
              >
                <HelpCircle size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bantuan Shortcut (Tekan ?)</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={onExport}
                className="flex items-center gap-1 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
              >
                <Upload size={16} />
                Export
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export (Ctrl+E)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={onImport}
                className="flex items-center gap-1 text-amber-700 border-amber-200 hover:bg-amber-50"
              >
                <Download size={16} />
                Import
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Import (Ctrl+I)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={onSaveAsImage}
                className="flex items-center gap-1 text-purple-700 border-purple-200 hover:bg-purple-50"
              >
                <ImageDown size={16} />
                Simpan Gambar
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Simpan sebagai Gambar (Ctrl+Shift+S)</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default FlowToolbar;
