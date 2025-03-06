import { Node } from 'reactflow';
import { X, Edit, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NodeDetailProps {
  node: Node;
  onClose: () => void;
  onUpdate: (nodeId: string, data: any) => void;
  onDelete: (nodeId: string) => void;
}

const NodeDetail = ({ node, onClose, onUpdate, onDelete }: NodeDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    label: node.data.label,
    description: node.data.description || '',
    details: { ...node.data.details } || {},
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editData.label.trim()) {
      toast.error('Nama elemen tidak boleh kosong');
      return;
    }

    onUpdate(node.id, {
      ...node.data,
      label: editData.label,
      description: editData.description,
      details: editData.details,
    });

    setIsEditing(false);
    toast.success('Elemen berhasil diperbarui');
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    onDelete(node.id);
    onClose();
    toast.success('Elemen berhasil dihapus');
  };

  const handleChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: value,
      },
    }));
  };

  return (
    <div className="w-full max-w-sm border-l border-gray-200 h-full overflow-y-auto">
      <Card className="border-0 rounded-none h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          {isEditing ? (
            <Input
              value={editData.label}
              onChange={(e) => handleChange('label', e.target.value)}
              className="font-medium"
            />
          ) : (
            <CardTitle className="text-md font-medium">{node.data.label}</CardTitle>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Deskripsi</h3>
            {isEditing ? (
              <Textarea
                value={editData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="min-h-[80px]"
              />
            ) : (
              <p className="text-sm mt-1">{node.data.description || 'Tidak ada deskripsi'}</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Kolom</h3>
            <p className="text-sm mt-1 capitalize">{node.data.column || 'Tidak ditentukan'}</p>
          </div>
          {(node.data.details || isEditing) && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Detail</h3>
              <div className="text-sm mt-1 space-y-2">
                {Object.entries(editData.details || {}).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="font-medium">{key}</span>
                    {isEditing ? (
                      <Input
                        value={value as string}
                        onChange={(e) => handleDetailChange(key, e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <span>{value as string}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Info Teknis</h3>
            <p className="text-sm">ID: {node.id}</p>
            <p className="text-sm">
              Posisi: x={Math.round(node.position.x)}, y={Math.round(node.position.y)}
            </p>
          </div>

          {confirmDelete && (
            <Alert variant="destructive">
              <AlertDescription>
                Apakah Anda yakin ingin menghapus elemen ini? Tindakan ini tidak dapat
                dibatalkan.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          {isEditing ? (
            <Button size="sm" variant="outline" className="w-full" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Simpan
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="w-full" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          <Button size="sm" variant="destructive" className="w-full" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            {confirmDelete ? 'Konfirmasi' : 'Hapus'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NodeDetail;