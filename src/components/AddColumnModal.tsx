
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { ChromePicker } from 'react-color';

interface AddColumnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddColumn: (columnData: { id: string; title: string; color: string }) => void;
}

const AddColumnModal = ({ open, onOpenChange, onAddColumn }: AddColumnModalProps) => {
  const [columnTitle, setColumnTitle] = useState("");
  const [columnColor, setColumnColor] = useState("#3b82f6");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSubmit = () => {
    if (!columnTitle.trim()) {
      toast.error("Nama kolom tidak boleh kosong");
      return;
    }
    
    // Create a simple ID from the title (lowercase, no spaces)
    const columnId = columnTitle.toLowerCase().replace(/\s+/g, '-');
    
    onAddColumn({
      id: columnId,
      title: columnTitle,
      color: `bg-[${columnColor}]` // Convert hex to tailwind compatible format
    });
    
    // Reset form
    setColumnTitle("");
    setColumnColor("#3b82f6");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Tambah Kolom Baru</DialogTitle>
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
              placeholder="Contoh: Keuangan"
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
                <span className={`text-sm font-medium ${columnColor.toLowerCase() < '#888888' ? 'text-white' : 'text-gray-800'}`}>
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
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Tambahkan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddColumnModal;
