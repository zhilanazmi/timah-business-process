
import { Button } from '../ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls = ({ onZoomIn, onZoomOut }: ZoomControlsProps) => {
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
    </div>
  );
};

export default ZoomControls;
