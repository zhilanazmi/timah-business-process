
import { Button } from '../ui/button';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
}

const ZoomControls = ({ onZoomIn, onZoomOut, onFitView }: ZoomControlsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onZoomIn}
        title="Perbesar (Ctrl+Plus)"
      >
        <ZoomIn size={16} />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onZoomOut}
        title="Perkecil (Ctrl+Minus)"
      >
        <ZoomOut size={16} />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onFitView}
        title="Tampilkan Semua (Ctrl+0)"
      >
        <Maximize2 size={16} />
      </Button>
    </div>
  );
};

export default ZoomControls;
