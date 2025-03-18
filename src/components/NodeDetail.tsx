
import React, { useState } from 'react';
import { Node } from 'reactflow';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Trash, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface NodeDetailProps {
  node: Node;
  onClose: () => void;
  onUpdate: (nodeId: string, data: any) => void;
  onDelete: (nodeId: string) => void;
}

const NodeDetail: React.FC<NodeDetailProps> = ({ node, onClose, onUpdate, onDelete }) => {
  const [nodeData, setNodeData] = useState({ ...node.data });
  
  // Skip editing for header nodes
  if (nodeData.isHeader === true) {
    return (
      <div className="fixed inset-0 bg-black/20 flex justify-end z-10">
        <div className="bg-white shadow-lg border p-4 w-[350px] h-full overflow-y-auto">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Header Kolom: {nodeData.label}</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Header kolom tidak dapat diubah. Tambahkan elemen baru di kolom ini menggunakan tombol "Tambah Elemen".</p>
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
    // Add protocol if not present
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-end z-10">
      <div className="bg-white shadow-lg border p-4 w-[350px] h-full overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Detail Elemen</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="label">Nama</Label>
            <Input 
              id="label" 
              value={nodeData.label} 
              onChange={(e) => handleChange('label', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea 
              id="description" 
              value={nodeData.description || ''} 
              onChange={(e) => handleChange('description', e.target.value)}
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="activityDetail">Uraian Kegiatan</Label>
            <Textarea 
              id="activityDetail" 
              value={nodeData.activityDetail || ''} 
              onChange={(e) => handleChange('activityDetail', e.target.value)}
              rows={3}
              placeholder="Berikan uraian lengkap tentang kegiatan ini"
            />
            <p className="text-xs text-gray-500 mt-1">Uraian kegiatan tidak akan ditampilkan pada elemen, hanya tersedia di detail.</p>
          </div>
          
          <div>
            <Label htmlFor="link">Link</Label>
            <div className="flex gap-2">
              <Input 
                id="link" 
                value={nodeData.link || ''} 
                onChange={(e) => handleChange('link', e.target.value)}
                placeholder="https://example.com"
              />
              {nodeData.link && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => openLink(nodeData.link)}
                  title="Buka link di tab baru"
                >
                  <ExternalLink size={16} />
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Link terkait dengan elemen ini</p>
          </div>
          
          {/* Details section */}
          <div className="space-y-3 border-t pt-3">
            <h4 className="text-sm font-medium">Detail Tambahan</h4>
            <div>
              <Label htmlFor="processOwner">Process Owner</Label>
              <Input 
                id="processOwner" 
                value={nodeData.details?.["Process Owner"] || ''} 
                onChange={(e) => handleDetailChange('Process Owner', e.target.value)}
              />
            </div>
            {/* <div>
              <Label htmlFor="duration">Duration</Label>
              <Input 
                id="duration" 
                value={nodeData.details?.["Duration"] || ''} 
                onChange={(e) => handleDetailChange('Duration', e.target.value)}
              />
            </div> */}
            {/* <div>
              <Label htmlFor="input">Input</Label>
              <Input 
                id="input" 
                value={nodeData.details?.["Input"] || ''} 
                onChange={(e) => handleDetailChange('Input', e.target.value)}
              />
            </div> */}
            {/* <div>
              <Label htmlFor="output">Output</Label>
              <Input 
                id="output" 
                value={nodeData.details?.["Output"] || ''} 
                onChange={(e) => handleDetailChange('Output', e.target.value)}
              />
            </div> */}
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between pt-2">
            <Button variant="destructive" size="sm" onClick={handleDelete} className="flex items-center gap-1">
              <Trash size={14} />
              Hapus
            </Button>
            <Button onClick={handleUpdate}>Simpan Perubahan</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeDetail;
