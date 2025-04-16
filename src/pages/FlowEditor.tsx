
import FlowChart from '@/components/FlowChart';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const FlowEditor = () => {
  return (
    <main className="h-screen relative">
      <FlowChart />
    </main>
  );
};

export default FlowEditor;
