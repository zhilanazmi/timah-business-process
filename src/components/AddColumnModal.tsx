import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { PlusCircle, Columns, Palette } from "lucide-react";

interface AddColumnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddColumn: (data: { id: string; title: string; color: string }) => void;
}

const colorPresets = [
  "#3b82f6", // blue
  "#22c55e", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#14b8a6", // teal
  "#f97316", // orange
  "#ec4899", // pink
  "#6366f1", // indigo
  "#84cc16", // lime
];

const AddColumnModal = ({ open, onOpenChange, onAddColumn }: AddColumnModalProps) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(colorPresets[0]);

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Judul kolom tidak boleh kosong");
      return;
    }

    const id = `kolom${Date.now().toString().slice(-6)}`;
    onAddColumn({ id, title, color });
    onOpenChange(false);
    toast.success("Kolom baru berhasil ditambahkan");
    
    // Reset form
    setTitle("");
    setColor(colorPresets[0]);
  };

  const fadeInAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] rounded-xl border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
        <motion.div initial="hidden" animate="visible" variants={fadeInAnimation}>
          <DialogHeader className="pb-2 border-b border-gray-100">
            <DialogTitle className="text-xl flex items-center gap-2 text-blue-700">
              <Columns className="h-5 w-5" />
              Tambah Kolom Baru
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-6">
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right font-medium">
                  Judul Kolom
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3 border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                  placeholder="Contoh: Perencanaan, Analisis, Pengembangan"
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-medium mt-2">
                  Warna Kolom
                </Label>
                <div className="col-span-3 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((presetColor) => (
                      <div 
                        key={presetColor}
                        onClick={() => setColor(presetColor)}
                        className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center hover:scale-110 ${
                          color === presetColor ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                        }`}
                        style={{ backgroundColor: presetColor }}
                      >
                        {color === presetColor && 
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        }
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-gray-500" />
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full h-8 p-1 cursor-pointer border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-2 flex items-center">
                <span className="mr-2">Preview:</span>
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-12 rounded-sm"
                  style={{ backgroundColor: color }}
                ></div>
                <div 
                  className="py-2 px-3 rounded-md shadow-sm w-40 bg-white border-l-4 text-center"
                  style={{ borderLeftColor: color }}
                >
                  <div className="text-sm font-medium truncate">{title || "Nama Kolom"}</div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-3 pt-4 border-t border-gray-100">
            <Button 
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Tambahkan Kolom
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AddColumnModal;