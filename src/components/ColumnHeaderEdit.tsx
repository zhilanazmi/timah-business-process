
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Palette, Save } from 'lucide-react';
import { toast } from 'sonner';

interface ColumnHeaderEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, color: string) => void;
  initialTitle: string;
  initialColor: string;
}

const colorPresets = [
  "from-blue-800 to-blue-900",
  "from-green-800 to-green-900",
  "from-amber-800 to-amber-900",
  "from-red-800 to-red-900",
  "from-purple-800 to-purple-900",
  "from-teal-800 to-teal-900",
];

const ColumnHeaderEdit = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialTitle, 
  initialColor 
}: ColumnHeaderEditProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Nama kolom tidak boleh kosong");
      return;
    }
    onSave(title, color);
    onClose();
    toast.success("Kolom berhasil diperbarui");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Kolom</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Nama Kolom
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Warna</Label>
            <div className="col-span-3 space-y-3">
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setColor(preset)}
                    className={`w-8 h-8 rounded transition-all bg-gradient-to-br ${preset} ${
                      color === preset ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-span-4">
            <div className="text-sm text-gray-500 mb-2">Preview:</div>
            <div className={`p-2 text-center text-white font-bold rounded-md shadow-md bg-gradient-to-r ${color}`}>
              {title || "Nama Kolom"}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnHeaderEdit;
