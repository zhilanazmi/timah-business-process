
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Node } from "reactflow";

interface NodeCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateNode: (nodeData: Omit<Node, "id" | "position">) => void;
  columns: { id: string; title: string; color: string }[];
}

const NodeCreationModal = ({ open, onOpenChange, onCreateNode, columns }: NodeCreationModalProps) => {
  const [formData, setFormData] = useState({
    label: "",
    description: "",
    column: "",
    details: {
      "Process Owner": "",
      "Duration": "",
      "Input": "",
      "Output": ""
    }
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    if (!formData.label) {
      toast.error("Nama elemen tidak boleh kosong");
      return;
    }

    if (!formData.column) {
      toast.error("Kolom harus dipilih");
      return;
    }
    
    const newNode = {
      type: "customNode",
      data: {
        label: formData.label,
        description: formData.description,
        column: formData.column,
        details: formData.details
      }
    };
    
    onCreateNode(newNode);
    onOpenChange(false);
    toast.success("Elemen baru berhasil dibuat");
    
    // Reset form
    setFormData({
      label: "",
      description: "",
      column: "",
      details: {
        "Process Owner": "",
        "Duration": "",
        "Input": "",
        "Output": ""
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Elemen Baru</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nama
            </Label>
            <Input
              id="name"
              value={formData.label}
              onChange={(e) => handleChange("label", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="column" className="text-right">
              Kolom
            </Label>
            <Select 
              value={formData.column} 
              onValueChange={(value) => handleChange("column", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih kolom" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((column) => (
                  <SelectItem key={column.id} value={column.id}>
                    {column.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Deskripsi
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="owner" className="text-right">
              Process Owner
            </Label>
            <Input
              id="owner"
              value={formData.details["Process Owner"]}
              onChange={(e) => handleDetailChange("Process Owner", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              value={formData.details["Duration"]}
              onChange={(e) => handleDetailChange("Duration", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="input" className="text-right">
              Input
            </Label>
            <Input
              id="input"
              value={formData.details["Input"]}
              onChange={(e) => handleDetailChange("Input", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="output" className="text-right">
              Output
            </Label>
            <Input
              id="output"
              value={formData.details["Output"]}
              onChange={(e) => handleDetailChange("Output", e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Tambahkan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NodeCreationModal;
