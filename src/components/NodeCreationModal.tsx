import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Node } from "reactflow";
import { motion } from "framer-motion";
import { PlusCircle, Square, Diamond, Circle, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NodeCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateNode: (nodeData: Omit<Node, "id" | "position">) => void;
  columns: { id: string; title: string; color: string }[];
}

const nodeTypes = [
  { id: "customNode", name: "Process Box", description: "Kotak proses standar", icon: <Square className="h-5 w-5" /> },
  { id: "terminatorNode", name: "Terminator", description: "Awal atau akhir proses (oval)", icon: <Circle className="h-5 w-5" /> },
  { id: "diamondNode", name: "Decision", description: "Decision/percabangan (diamond)", icon: <Diamond className="h-5 w-5" /> },
  { id: "documentNode", name: "Document", description: "Dokumen (document shape)", icon: <FileText className="h-5 w-5" /> },
];

const NodeCreationModal = ({ open, onOpenChange, onCreateNode, columns }: NodeCreationModalProps) => {
  const [formData, setFormData] = useState({
    label: "",
    description: "",
    column: "",
    nodeType: "customNode",
    link: "",
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
      type: formData.nodeType,
      data: {
        label: formData.label,
        description: formData.description,
        column: formData.column,
        link: formData.link,
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
      nodeType: "customNode",
      link: "",
      details: {
        "Process Owner": "",
        "Duration": "",
        "Input": "",
        "Output": ""
      }
    });
  };

  const fadeInAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] rounded-xl border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
        <motion.div initial="hidden" animate="visible" variants={fadeInAnimation}>
          <DialogHeader className="pb-2 border-b border-gray-100">
            <DialogTitle className="text-xl flex items-center gap-2 text-blue-700">
              <PlusCircle className="h-5 w-5" />
              Tambah Elemen Baru
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="py-4">
            <TabsList className="mb-4 w-full grid grid-cols-2">
              <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
              <TabsTrigger value="details">Detail Tambahan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6 mt-2">
              {/* Tipe Node */}
              <div className="grid grid-cols-4 gap-4">
                {nodeTypes.map((type) => (
                  <div 
                    key={type.id}
                    onClick={() => handleChange("nodeType", type.id)}
                    className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all border-2 hover:shadow-md
                      ${formData.nodeType === type.id 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'}`}
                  >
                    <div className={`p-2 rounded-full ${formData.nodeType === type.id ? 'text-blue-600' : 'text-gray-600'}`}>
                      {type.icon}
                    </div>
                    <span className="text-sm font-medium mt-1">{type.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right font-medium">
                    Nama
                  </Label>
                  <Input
                    id="name"
                    value={formData.label}
                    onChange={(e) => handleChange("label", e.target.value)}
                    className="col-span-3 border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="column" className="text-right font-medium">
                    Kolom
                  </Label>
                  <Select 
                    value={formData.column} 
                    onValueChange={(value) => handleChange("column", value)}
                  >
                    <SelectTrigger className="col-span-3 border-gray-300">
                      <SelectValue placeholder="Pilih kolom" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column.id} value={column.id} className="transition-colors hover:bg-blue-50">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: column.color || '#aaa' }}></div>
                            {column.title}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right font-medium">
                    Deskripsi
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="col-span-3 min-h-[80px] border-gray-300 focus:border-blue-400"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="link" className="text-right font-medium">
                    Link
                  </Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => handleChange("link", e.target.value)}
                    className="col-span-3 border-gray-300"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4 mt-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="owner" className="text-right font-medium">
                  Process Owner
                </Label>
                <Input
                  id="owner"
                  value={formData.details["Process Owner"]}
                  onChange={(e) => handleDetailChange("Process Owner", e.target.value)}
                  className="col-span-3 border-gray-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right font-medium">
                  Duration
                </Label>
                <Input
                  id="duration"
                  value={formData.details["Duration"]}
                  onChange={(e) => handleDetailChange("Duration", e.target.value)}
                  className="col-span-3 border-gray-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="input" className="text-right font-medium">
                  Input
                </Label>
                <Input
                  id="input"
                  value={formData.details["Input"]}
                  onChange={(e) => handleDetailChange("Input", e.target.value)}
                  className="col-span-3 border-gray-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="output" className="text-right font-medium">
                  Output
                </Label>
                <Input
                  id="output"
                  value={formData.details["Output"]}
                  onChange={(e) => handleDetailChange("Output", e.target.value)}
                  className="col-span-3 border-gray-300"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6 pt-4 border-t border-gray-100">
            <Button 
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Tambahkan
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeCreationModal;
