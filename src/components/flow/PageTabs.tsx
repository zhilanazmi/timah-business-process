
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Plus, Edit2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export interface FlowPage {
  id: string;
  title: string;
  nodes: any[];
  edges: any[];
}

interface PageTabsProps {
  pages: FlowPage[];
  currentPage: string;
  onChangePage: (pageId: string) => void;
  onAddPage: (pageTitle: string) => void;
  onRenamePage: (pageId: string, newTitle: string) => void;
  onDeletePage: (pageId: string) => void;
}

const PageTabs = ({ pages, currentPage, onChangePage, onAddPage, onRenamePage, onDeletePage }: PageTabsProps) => {
  const [openNewPageDialog, setOpenNewPageDialog] = useState(false);
  const [openRenamePageDialog, setOpenRenamePageDialog] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [editingPage, setEditingPage] = useState<FlowPage | null>(null);

  const handleAddPage = () => {
    if (newPageTitle.trim()) {
      onAddPage(newPageTitle.trim());
      setNewPageTitle('');
      setOpenNewPageDialog(false);
    } else {
      toast.error('Nama halaman tidak boleh kosong');
    }
  };

  const handleStartRenamePage = (page: FlowPage, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPage(page);
    setNewPageTitle(page.title);
    setOpenRenamePageDialog(true);
  };

  const handleConfirmRename = () => {
    if (editingPage && newPageTitle.trim()) {
      onRenamePage(editingPage.id, newPageTitle.trim());
      setOpenRenamePageDialog(false);
      setEditingPage(null);
    } else {
      toast.error('Nama halaman tidak boleh kosong');
    }
  };

  const handleStartDeletePage = (page: FlowPage, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPage(page);
    setOpenDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (editingPage) {
      onDeletePage(editingPage.id);
      setOpenDeleteConfirm(false);
      setEditingPage(null);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white p-1 rounded-md shadow-sm mb-2">
      <Tabs value={currentPage} className="w-full" onValueChange={onChangePage}>
        <TabsList className="flex overflow-x-auto h-9 w-full justify-start bg-gray-100 p-1">
          {pages.map(page => (
            <TabsTrigger 
              key={page.id} 
              value={page.id}
              className="flex items-center gap-1 px-3 whitespace-nowrap"
            >
              {page.title}
              <div className="flex items-center ml-1">
                <button 
                  onClick={(e) => handleStartRenamePage(page, e)}
                  className="p-0.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                  title="Ganti nama halaman"
                >
                  <Edit2 size={12} />
                </button>
                {pages.length > 1 && (
                  <button 
                    onClick={(e) => handleStartDeletePage(page, e)}
                    className="p-0.5 text-gray-500 hover:text-red-500 focus:outline-none"
                    title="Hapus halaman"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </TabsTrigger>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 flex items-center gap-1"
            onClick={() => setOpenNewPageDialog(true)}
            title="Tambah halaman baru"
          >
            <Plus size={16} />
          </Button>
        </TabsList>
      </Tabs>

      {/* New Page Dialog */}
      <Dialog open={openNewPageDialog} onOpenChange={setOpenNewPageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Halaman Baru</DialogTitle>
            <DialogDescription>
              Masukkan nama untuk halaman baru
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newPageTitle}
            onChange={(e) => setNewPageTitle(e.target.value)}
            placeholder="Nama Halaman"
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenNewPageDialog(false)}>Batal</Button>
            <Button onClick={handleAddPage}>Tambah</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Page Dialog */}
      <Dialog open={openRenamePageDialog} onOpenChange={setOpenRenamePageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ganti Nama Halaman</DialogTitle>
            <DialogDescription>
              Masukkan nama baru untuk halaman ini
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newPageTitle}
            onChange={(e) => setNewPageTitle(e.target.value)}
            placeholder="Nama Halaman"
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenRenamePageDialog(false)}>Batal</Button>
            <Button onClick={handleConfirmRename}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteConfirm} onOpenChange={setOpenDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Halaman</DialogTitle>
            <DialogDescription>
              Anda yakin ingin menghapus halaman "{editingPage?.title}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteConfirm(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageTabs;
