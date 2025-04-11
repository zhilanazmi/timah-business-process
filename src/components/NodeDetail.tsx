
import React, { useState, useEffect } from 'react';
import { Node } from 'reactflow';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Trash, ExternalLink, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface NodeDetailProps {
  node: Node;
  onClose: () => void;
  onUpdate: (nodeId: string, data: any) => void;
  onDelete: (nodeId: string) => void;
}

const NodeDetail: React.FC<NodeDetailProps> = ({ node, onClose, onUpdate, onDelete }) => {
  const [nodeData, setNodeData] = useState({ ...node.data });

  // Function to handle closing with auto-save
  const handleCloseWithSave = () => {
    // Save any changes before closing
    onUpdate(node.id, nodeData);
    onClose();
  };

  // Close detail on Escape key press - now with auto-save
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseWithSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, node.id, nodeData]);

  // Skip editing for header nodes
  if (nodeData.isHeader === true) {
    return (
      <div className="fixed inset-0 bg-black/20 flex justify-end z-10 backdrop-blur-sm transition-all">
        <div className="bg-white shadow-lg border-l p-6 w-[380px] h-full overflow-y-auto animate-slide-in-right">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Header Kolom: {nodeData.label}</h3>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-8 w-8 p-0">
              <X />
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
            Header kolom tidak dapat diubah. Tambahkan elemen baru di kolom ini menggunakan tombol "Tambah Elemen".
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    setNodeData(prev => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (field: string, value: string) => {
    setNodeData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: value
      }
    }));
  };

  const handleUpdate = () => {
    onUpdate(node.id, nodeData);
    toast.success("Elemen berhasil diperbarui");
    onClose();
  };

  const handleDelete = () => {
    onDelete(node.id);
    toast.success("Elemen berhasil dihapus");
    onClose();
  };

  const openLink = (url: string) => {
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-end z-10 backdrop-blur-sm transition-all">
      <div className="bg-white shadow-lg border-l p-6 w-[380px] h-full overflow-y-auto animate-slide-in-right">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Detail Elemen</h3>
          <Button variant="ghost" size="sm" onClick={handleCloseWithSave} className="rounded-full h-8 w-8 p-0">
            <X />
          </Button>
        </div>
        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="label" className="text-sm font-medium">Nama</Label>
            <Input 
              id="label" 
              value={nodeData.label} 
              onChange={(e) => handleChange('label', e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Deskripsi</Label>
            <Textarea 
              id="description" 
              value={nodeData.description || ''} 
              onChange={(e) => handleChange('description', e.target.value)}
              rows={2}
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activityDetail" className="text-sm font-medium">Uraian Kegiatan</Label>
            <Textarea 
              id="activityDetail" 
              value={nodeData.activityDetail || ''} 
              onChange={(e) => handleChange('activityDetail', e.target.value)}
              rows={3}
              placeholder="Berikan uraian lengkap tentang kegiatan ini"
              className="focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Uraian kegiatan tidak akan ditampilkan pada elemen, hanya tersedia di detail.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link" className="text-sm font-medium">Link</Label>
            <div className="flex gap-2">
              <Input 
                id="link" 
                value={nodeData.link || ''} 
                onChange={(e) => handleChange('link', e.target.value)}
                placeholder="https://example.com"
                className="focus:ring-2 focus:ring-blue-500"
              />
              {nodeData.link && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => openLink(nodeData.link)}
                  title="Buka link di tab baru"
                  className="hover:bg-blue-50"
                >
                  <ExternalLink size={16} />
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Link terkait dengan elemen ini</p>
          </div>
          
          {/* Details section */}
          <div className="space-y-3 border-t pt-4 mt-4">
            <h4 className="text-sm font-bold text-gray-700">Detail Tambahan</h4>
            <div className="space-y-2">
              <Label htmlFor="processOwner" className="text-sm font-medium">Process Owner</Label>
              <Input 
                id="processOwner" 
                value={nodeData.details?.["Process Owner"] || ''} 
                onChange={(e) => handleDetailChange('Process Owner', e.target.value)}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between pt-6 border-t mt-6">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleDelete} 
              className="flex items-center gap-1 hover:bg-red-600"
            >
              <Trash size={14} />
              Hapus
            </Button>
            <Button 
              onClick={handleUpdate}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
            >
              <Save size={16} />
              Simpan Perubahan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeDetail;
