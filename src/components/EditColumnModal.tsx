
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ChromePicker } from 'react-color';
import { Switch } from "@/components/ui/switch";

interface EditColumnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  column: { id: string; title: string; color: string; locked: boolean } | null;
  onUpdateColumn: (columnId: string, data: { title: string; color: string; locked: boolean }) => void;
}

const EditColumnModal = ({ open, onOpenChange, column, onUpdateColumn }: EditColumnModalProps) => {
  const [columnTitle, setColumnTitle] = useState("");
  const [columnColor, setColumnColor] = useState("#3b82f6");
  const [isLocked, setIsLocked] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (column) {
      setColumnTitle(column.title);
      setColumnColor(column.color);
      setIsLocked(column.locked);
    }
  }, [column]);

  // Helper function to determine if text should be white or dark based on background color
  const getTextColor = (hexColor: string) => {
    // Convert hex to RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate brightness (perceived luminance)
    // Formula: (0.299*R + 0.587*G + 0.114*B)
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white for dark colors, dark for light colors
    return brightness < 0.6 ? 'text-white' : 'text-gray-800';
  };

  const handleSubmit = () => {
    if (!column) return;
    
    if (!columnTitle.trim()) {
      toast.error("Nama kolom tidak boleh kosong");
      return;
    }
    
    onUpdateColumn(column.id, {
      title: columnTitle,
      color: columnColor,
      locked: isLocked
    });
    
    onOpenChange(false);
    toast.success("Kolom berhasil diperbarui");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Kolom</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="columnTitle" className="text-right">
              Nama Kolom
            </Label>
            <Input
              id="columnTitle"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="columnColor" className="text-right">
              Warna
            </Label>
            <div className="col-span-3">
              <div 
                className="w-full h-10 rounded border cursor-pointer flex items-center px-3"
                style={{ backgroundColor: columnColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                <span className={getTextColor(columnColor)}>
                  {columnColor}
                </span>
              </div>
              
              {showColorPicker && (
                <div className="absolute z-10 mt-2">
                  <div 
                    className="fixed inset-0" 
                    onClick={() => setShowColorPicker(false)}
                  />
                  <ChromePicker 
                    color={columnColor} 
                    onChange={(color) => setColumnColor(color.hex)} 
                    disableAlpha={true}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="columnLocked" className="text-right">
              Kunci Kolom
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch 
                id="columnLocked" 
                checked={isLocked} 
                onCheckedChange={setIsLocked} 
              />
              <span className="text-sm text-gray-600">
                {isLocked ? 'Terkunci' : 'Tidak terkunci'}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Simpan Perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditColumnModal;
