
import FlowChart from '@/components/FlowChart';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const FlowEditor = () => {
  return (
    <main className="h-screen relative">
      <FlowChart onHeaderUpdate={(nodeId, newTitle, newColor) => {
        // Header update logic will be handled by FlowChart component
      }} />
    </main>
  );
};

export default FlowEditor;
