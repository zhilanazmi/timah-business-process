import FlowChart from '@/components/FlowChart';
import { Info } from 'lucide-react';

const Index = () => {
  return (
    <main className="container mx-auto p-4 h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">PT. Timah Industri</h1>
        {/* <div className="flex items-start gap-2 text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-100">
          <Info className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
          <div>
            <p className="mb-1">
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
        </div> */}
      </div>
      <div className="h-[calc(100vh-100px)] border rounded-md shadow-sm overflow-hidden">
        <FlowChart />
      </div>
    </main>
  );
};

export default Index;
