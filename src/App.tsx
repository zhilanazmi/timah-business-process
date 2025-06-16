import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FlowEditor from "./pages/FlowEditor";
import DynamicFlowRoute from "./pages/DynamicFlowRoute";
import PerencanaanProduksiEmbedPage from "./pages/embeds/PerencanaanProduksiEmbedPage";
import EmbedGenerator from "./pages/EmbedGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flow-editor" element={<FlowEditor />} />
          <Route path="/embed-generator" element={<EmbedGenerator />} />
          
          {/* Primary flow routes */}
          <Route path="/perencanaan-produksi" element={<DynamicFlowRoute flowId="perencanaan-produksi" />} />
          <Route path="/analisa-sampel-rutin" element={<DynamicFlowRoute flowId="analisa-sampel-rutin" />} />
          <Route path="/analisa-sampel-non-rutin" element={<DynamicFlowRoute flowId="analisa-sampel-non-rutin" />} />
          
          {/* Legacy routes for backward compatibility */}
          <Route path="/produksi-barang" element={<DynamicFlowRoute flowId="perencanaan-produksi" />} />
          <Route path="/kontrak-penjualan" element={<DynamicFlowRoute flowId="analisa-sampel-rutin" />} />
          <Route path="/pengiriman-barang" element={<DynamicFlowRoute flowId="analisa-sampel-non-rutin" />} />
          <Route path="/sampel-rutin" element={<DynamicFlowRoute flowId="analisa-sampel-rutin" />} />
          <Route path="/non-sampel-rutin" element={<DynamicFlowRoute flowId="analisa-sampel-non-rutin" />} />
          
          {/* Embed routes */}
          <Route path="/embed/perencanaan-produksi" element={<PerencanaanProduksiEmbedPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
