import { Button } from '../ui/button';
import { Plus, Save, Download, Upload, Undo, Redo, Columns, ImageDown, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useState, useEffect } from 'react';

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
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="sticky top-0 z-10 p-3 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between gap-3">
      <TooltipProvider delayDuration={300}>
        {/* Left section - Creator tools */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-gray-50 p-1 rounded-lg flex gap-1 shadow-inner">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  onClick={onAddNode} 
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm"
                >
                  <Plus size={16} className="animate-pulse" />
                  {!isCompact && "Tambah Elemen"}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-blue-50 border border-blue-200">
                <p className="font-medium">Tambah Elemen <span className="text-xs text-gray-500">Ctrl+N</span></p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  onClick={onAddColumn} 
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200 shadow-sm"
                >
                  <Columns size={16} />
                  {!isCompact && "Tambah Kolom"}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-indigo-50 border border-indigo-200">
                <p className="font-medium">Tambah Kolom <span className="text-xs text-gray-500">Ctrl+Shift+C</span></p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="h-6 w-px bg-gray-300 mx-1 hidden sm:block" />
          
          <div className="bg-gray-50 p-1 rounded-lg flex shadow-inner">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onUndo}
                  disabled={!canUndo}
                  className={`rounded-r-none px-2 border-r border-gray-200 ${!canUndo ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-200 active:bg-gray-300'}`}
                >
                  <Undo size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="font-medium">Undo <span className="text-xs text-gray-500">Ctrl+Z</span></p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onRedo}
                  disabled={!canRedo}
                  className={`rounded-l-none px-2 ${!canRedo ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-200 active:bg-gray-300'}`}
                >
                  <Redo size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="font-medium">Redo <span className="text-xs text-gray-500">Ctrl+Shift+Z / Ctrl+Y</span></p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              {/* <Button
                size="sm"
                variant="outline"
                onClick={onSave}
                className="flex items-center gap-1.5 text-blue-700 border-blue-200 hover:bg-blue-50 active:bg-blue-100 transition-all ml-auto"
              >
                <Save size={16} />
                {!isCompact && "Simpan"}
              </Button> */}
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="font-medium">Simpan <span className="text-xs text-gray-500">Ctrl+S</span></p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="h-px w-full sm:hidden bg-gray-200 my-1" />
        
        {/* Right section - File operations */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-gray-50 p-1 rounded-lg flex gap-1 shadow-inner">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onExport}
                  className="flex items-center gap-1.5 text-emerald-700 border-emerald-200 hover:bg-emerald-50 active:bg-emerald-100 transition-all"
                >
                  <Upload size={16} />
                  {!isCompact && "Export"}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-emerald-50 border border-emerald-200">
                <p className="font-medium">Export <span className="text-xs text-gray-500">Ctrl+E</span></p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onImport}
                  className="flex items-center gap-1.5 text-amber-700 border-amber-200 hover:bg-amber-50 active:bg-amber-100 transition-all"
                >
                  <Download size={16} />
                  {!isCompact && "Import"}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-amber-50 border border-amber-200">
                <p className="font-medium">Import <span className="text-xs text-gray-500">Ctrl+I</span></p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={onSaveAsImage}
                className="flex items-center gap-1.5 text-purple-700 border-purple-200 hover:bg-purple-50 active:bg-purple-100 transition-all"
              >
                <ImageDown size={16} />
                {!isCompact && "Simpan Gambar"}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-purple-50 border border-purple-200">
              <p className="font-medium">Simpan sebagai Gambar <span className="text-xs text-gray-500">Ctrl+Shift+S</span></p>
            </TooltipContent>
          </Tooltip>
          
          <div className="h-6 w-px bg-gray-300 mx-1 hidden sm:block" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={onShowShortcuts}
                className="px-2 hover:bg-blue-50 active:bg-blue-100 transition-all rounded-full aspect-square"
                aria-label="Bantuan Shortcut"
              >
                <HelpCircle size={16} className="text-blue-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="font-medium">Bantuan Shortcut <span className="text-xs text-gray-500">Tekan ?</span></p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default FlowToolbar;
