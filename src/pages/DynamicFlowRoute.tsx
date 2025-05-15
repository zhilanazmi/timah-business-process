import FlowChart from '@/components/FlowChart';
import { getFlowById } from '@/data/flows';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { FlowData } from '@/data/flows/types';

interface DynamicFlowRouteProps {
  flowId: string;
}

const DynamicFlowRoute = ({ flowId }: DynamicFlowRouteProps) => {
  const navigate = useNavigate();
  const [flowData, setFlowData] = useState<FlowData | null>(null);
  
  useEffect(() => {
    const flow = getFlowById(flowId);
    if (!flow) {
      toast.error(`Flow dengan ID "${flowId}" tidak ditemukan`);
      navigate('/');
      return;
    }
    
    setFlowData(flow);
    document.title = `${flow.title} - TimahIndustri Business Process`;
  }, [flowId, navigate]);
  
  if (!flowData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat diagram alir...</p>
        </div>
      </div>
    );
  }
  
  return (
    <main className="h-screen relative">
      <div className="absolute top-0 left-0 z-10 p-2">
        <Button 
          onClick={() => navigate('/')}
          variant="ghost" 
          size="sm"
          className="flex items-center gap-2 bg-white/80 hover:bg-white shadow-sm"
        >
          <Home size={16} />
          <span className="hidden sm:inline">Beranda</span>
        </Button>
      </div>
      <FlowChart initialFlowData={flowData} />
    </main>
  );
};

export default DynamicFlowRoute; 