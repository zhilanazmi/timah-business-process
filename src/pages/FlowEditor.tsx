import FlowChart from '@/components/FlowChart';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const FlowEditor = () => {
  return (
    <main className="h-screen relative">
      <div className="absolute top-2 left-2 z-50">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Home size={16} />
            <span>Kembali ke Beranda</span>
          </Button>
        </Link>
      </div>
      <div className="h-full">
        <FlowChart />
      </div>
    </main>
  );
};

export default FlowEditor; 