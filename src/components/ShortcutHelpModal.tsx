
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const ShortcutHelpModal = ({ open, onOpenChange }) => {
  const shortcuts = [
    { action: "Tambah Elemen", shortcut: "Ctrl/Cmd + N" },
    { action: "Tambah Kolom", shortcut: "Ctrl/Cmd + Shift + C" },
    { action: "Undo", shortcut: "Ctrl/Cmd + Z" },
    { action: "Redo", shortcut: "Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y" },
    { action: "Simpan", shortcut: "Ctrl/Cmd + S" },
    { action: "Export", shortcut: "Ctrl/Cmd + E" },
    { action: "Simpan sebagai Gambar", shortcut: "Ctrl/Cmd + Shift + S" },
    { action: "Perbesar", shortcut: "Ctrl/Cmd + Plus" },
    { action: "Perkecil", shortcut: "Ctrl/Cmd + Minus" },
    { action: "Tampilkan Seluruh Diagram", shortcut: "Ctrl/Cmd + 0" },
    { action: "Hapus Elemen Terpilih", shortcut: "Delete/Backspace" },
    { action: "Toggle Interaktivitas", shortcut: "Ctrl/Cmd + I" },
    { action: "Bantuan Shortcut", shortcut: "?" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bantuan Shortcut Keyboard</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left border-b pb-2">Aksi</th>
                <th className="text-left border-b pb-2">Shortcut</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2">{item.action}</td>
                  <td className="py-2">
                    <kbd className="px-2 py-1 bg-gray-100 rounded">{item.shortcut}</kbd>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShortcutHelpModal;
