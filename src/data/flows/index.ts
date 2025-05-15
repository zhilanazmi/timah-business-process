import { FlowData } from './types';
import analisaSampelRutinFlow from './analisaSampelRutin';
import perencanaanProduksiFlow from './perencanaanProduksi';
import analisaSampelNonRutinFlow from './analisaSampelNonRutin';

// Map of all available flows
const flows: Record<string, FlowData> = {
  // Original flow IDs
  'perencanaan-produksi': perencanaanProduksiFlow,
  'analisa-sampel-rutin': analisaSampelRutinFlow,
  'analisa-sampel-non-rutin': analisaSampelNonRutinFlow,
  
  // Alias IDs for backward compatibility
  'produksi-barang': perencanaanProduksiFlow,
  'kontrak-penjualan': analisaSampelRutinFlow,
  'pengiriman-barang': analisaSampelNonRutinFlow,
  'sampel-rutin': analisaSampelRutinFlow,
  'non-sampel-rutin': analisaSampelNonRutinFlow,
  
  // Default flow for the original /flow-editor route
  'flow-editor': {
    ...perencanaanProduksiFlow,
    id: 'flow-editor',
    title: 'Flow Editor',
    description: 'Editor diagram alir umum'
  }
};

export const getFlowById = (id: string): FlowData | undefined => {
  return flows[id];
};

export const getAllFlows = (): FlowData[] => {
  // Return only unique flows (no duplicates from aliases)
  const uniqueFlows = new Map();
  Object.values(flows).forEach(flow => {
    if (!uniqueFlows.has(flow.id)) {
      uniqueFlows.set(flow.id, flow);
    }
  });
  return Array.from(uniqueFlows.values());
};

export default flows; 