
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ShortcutHelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShortcutHelpModal = ({ open, onOpenChange }: ShortcutHelpModalProps) => {
  const shortcuts = [
    { key: 'Ctrl+N', description: 'Tambah Elemen Baru' },
    { key: 'Ctrl+Shift+C', description: 'Tambah Kolom Baru' },
    { key: 'Ctrl+Z', description: 'Undo' },
    { key: 'Ctrl+Shift+Z / Ctrl+Y', description: 'Redo' },
    { key: 'Ctrl+S', description: 'Simpan Flow Chart' },
    { key: 'Ctrl+E', description: 'Export Flow Chart' },
    { key: 'Ctrl+I', description: 'Import Flow Chart' },
    { key: 'Ctrl+Shift+S', description: 'Simpan sebagai Gambar' },
    { key: 'Delete / Backspace', description: 'Hapus Elemen Terpilih' },
    { key: 'Ctrl+Plus (+)', description: 'Zoom In' },
    { key: 'Ctrl+Minus (-)', description: 'Zoom Out' },
    { key: 'Ctrl+0', description: 'Fit View' },
    { key: 'Ctrl+Page Up', description: 'Pindah ke Halaman Sebelumnya' },
    { key: 'Ctrl+Page Down', description: 'Pindah ke Halaman Berikutnya' },
    { key: 'Ctrl+T', description: 'Tambah Halaman Baru' },
    { key: '?', description: 'Tampilkan Bantuan Shortcut' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shortcut Keyboard</DialogTitle>
          <DialogDescription>
            Gunakan shortcut keyboard berikut untuk mempercepat pekerjaan Anda
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between py-1">
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 mr-2 text-sm font-mono">
                {shortcut.key}
              </kbd>
              <span className="text-sm">{shortcut.description}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShortcutHelpModal;
