import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFlowById } from '@/data/flows';
import FlowChart from './FlowChart';
import { Button } from './ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { FlowData } from '@/data/flows/types';

const DynamicFlowChart = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const navigate = useNavigate();
  const [flowData, setFlowData] = useState<FlowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!flowId) {
      setError('Flow ID tidak ditemukan');
      setLoading(false);
      return;
    }

    const flow = getFlowById(flowId);
    if (!flow) {
      setError(`Flow dengan ID "${flowId}" tidak ditemukan`);
      setLoading(false);
      return;
    }

    setFlowData(flow);
    setLoading(false);
  }, [flowId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat diagram alir...</p>
        </div>
      </div>
    );
  }

  if (error || !flowData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error || 'Terjadi kesalahan saat memuat diagram alir'}</p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => navigate('/')} variant="outline" className="flex items-center gap-2">
              <Home size={16} />
              Kembali ke Beranda
            </Button>
            <Button onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Kembali
            </Button>
          </div>
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

export default DynamicFlowChart; 