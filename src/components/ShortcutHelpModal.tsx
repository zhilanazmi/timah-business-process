
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ShortcutHelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShortcutHelpModal = ({ open, onOpenChange }: ShortcutHelpModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Bantuan Shortcut Keyboard</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shortcut</TableHead>
                <TableHead>Fungsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">Ctrl + N</TableCell>
                <TableCell>Tambah elemen baru</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">Ctrl + Shift + C</TableCell>
                <TableCell>Tambah kolom baru</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">Ctrl + Z</TableCell>
                <TableCell>Undo</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">Ctrl + Shift + Z</TableCell>
                <TableCell>Redo</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">Ctrl + Y</TableCell>
                <TableCell>Redo (alternatif)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">Ctrl + S</TableCell>
                <TableCell>Simpan sebagai gambar</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">Ctrl + E</TableCell>
                <TableCell>Export data</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">Ctrl + +</TableCell>
                <TableCell>Perbesar tampilan</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">Ctrl + -</TableCell>
                <TableCell>Perkecil tampilan</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">Ctrl + 0</TableCell>
                <TableCell>Tampilkan semua elemen</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">Delete / Backspace</TableCell>
                <TableCell>Hapus elemen yang dipilih</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">?</TableCell>
                <TableCell>Tampilkan bantuan shortcut</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Mengedit Kolom</h3>
            <p className="text-sm">
              Untuk mengedit nama atau warna kolom, arahkan mouse ke judul kolom dan klik ikon pensil (✏️).
              Untuk mengunci atau membuka kunci kolom, gunakan ikon kunci (🔒/🔓) di header kolom.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShortcutHelpModal;
