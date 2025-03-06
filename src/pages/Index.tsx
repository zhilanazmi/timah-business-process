
import { useState } from 'react';
import FlowChart from '@/components/FlowChart';

const Index = () => {
  return (
    <main className="container mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Business Process Flow Chart</h1>
      <div className="h-[calc(100vh-100px)]">
        <FlowChart />
      </div>
    </main>
  );
};

export default Index;
