
import { useState } from 'react';
import FlowChart from '@/components/FlowChart';

const Index = () => {
  return (
    <main className="container mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold mb-2">Business Process Flow Chart</h1>
      <p className="mb-4 text-gray-600">
        Buat dan edit diagram alir proses bisnis. Tambahkan elemen baru dan hubungkan antar elemen sesuai kebutuhan.
      </p>
      <div className="h-[calc(100vh-140px)] border rounded-md shadow-sm overflow-hidden">
        <FlowChart />
      </div>
    </main>
  );
};

export default Index;
