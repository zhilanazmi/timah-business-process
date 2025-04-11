
import FlowChart from '@/components/FlowChart';
import { Info } from 'lucide-react';

const Index = () => {
  return (
    <main className="container mx-auto p-4 h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">PT. Timah Industri</h1>
        <div className="flex items-start gap-2 text-gray-600 bg-blue-50 p-4 rounded-md border border-blue-100 shadow-sm">
          <Info className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
          <div>
            <p className="mb-2">
              Buat dan edit diagram alir proses bisnis. Tambahkan elemen baru dan hubungkan antar elemen sesuai kebutuhan.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Klik tombol <strong>Tambah Elemen</strong> untuk menambahkan elemen baru (kotak proses, terminator, diamond, atau dokumen)</li>
              <li>Klik pada elemen untuk melihat detail dan mengeditnya</li>
              <li>Tarik dari titik di sisi kanan ke titik di sisi kiri elemen lain untuk menghubungkan dengan tanda panah</li>
              <li>Gunakan <strong>Undo/Redo</strong> untuk membatalkan atau mengulangi perubahan</li>
              <li>Simpan dan export diagram Anda dengan tombol yang tersedia</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-170px)] border rounded-md shadow-lg overflow-hidden bg-white">
        <FlowChart />
      </div>
    </main>
  );
};

export default Index;
