import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Copy, ExternalLink, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EmbedGenerator: React.FC = () => {
  const [config, setConfig] = useState({
    height: '600',
    width: '100%',
    showControls: true,
    showMiniMap: false,
    showBackground: true,
    interactive: false,
    showTitle: true,
    showHeaders: true,
    showHandlesToggle: true,
  });

  const { toast } = useToast();

  const generateEmbedUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    
    if (config.height !== '600') params.append('height', config.height + 'px');
    if (config.width !== '100%') params.append('width', config.width);
    if (!config.showControls) params.append('controls', 'false');
    if (config.showMiniMap) params.append('minimap', 'true');
    if (!config.showBackground) params.append('background', 'false');
    if (config.interactive) params.append('interactive', 'true');
    if (!config.showTitle) params.append('title', 'false');
    if (!config.showHeaders) params.append('headers', 'false');
    if (!config.showHandlesToggle) params.append('handlesToggle', 'false');

    const queryString = params.toString();
    return `${baseUrl}/embed/perencanaan-produksi${queryString ? '?' + queryString : ''}`;
  };

  const generateIframeCode = () => {
    const url = generateEmbedUrl();
    const heightValue = config.height.includes('%') ? config.height : config.height + 'px';
    
    return `<iframe 
  src="${url}"
  width="${config.width}"
  height="${heightValue}"
  frameborder="0"
  style="border: 1px solid #e5e7eb; border-radius: 8px;"
  title="Diagram Perencanaan Produksi - PT. Timah Industri">
</iframe>`;
  };

  const generateReactCode = () => {
    return `import PerencanaanProduksiEmbed from './components/embeds/PerencanaanProduksiEmbed';

function MyComponent() {
  return (
    <PerencanaanProduksiEmbed
      height="${config.height}${config.height.includes('%') ? '' : 'px'}"
      width="${config.width}"
      showControls={${config.showControls}}
      showMiniMap={${config.showMiniMap}}
      showBackground={${config.showBackground}}
      interactive={${config.interactive}}
      showTitle={${config.showTitle}}
    />
  );
}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Disalin!",
      description: "Kode embed telah disalin ke clipboard.",
    });
  };

  const openPreview = () => {
    const url = generateEmbedUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Generator Embed Diagram Perencanaan Produksi
            </h1>
            <p className="text-gray-600">
              Buat kode embed untuk menampilkan diagram alir Perencanaan Produksi di website atau aplikasi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Konfigurasi Embed</CardTitle>
                <CardDescription>
                  Sesuaikan tampilan dan fitur diagram yang akan di-embed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dimensions */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Ukuran</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Lebar</Label>
                      <Input
                        id="width"
                        value={config.width}
                        onChange={(e) => setConfig({ ...config, width: e.target.value })}
                        placeholder="100% atau 800px"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Tinggi</Label>
                      <Input
                        id="height"
                        value={config.height}
                        onChange={(e) => setConfig({ ...config, height: e.target.value })}
                        placeholder="600 atau 100%"
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Fitur</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showTitle">Tampilkan Judul</Label>
                      <Switch
                        id="showTitle"
                        checked={config.showTitle}
                        onCheckedChange={(checked) => setConfig({ ...config, showTitle: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showHeaders">Tampilkan Header Kolom</Label>
                      <Switch
                        id="showHeaders"
                        checked={config.showHeaders}
                        onCheckedChange={(checked) => setConfig({ ...config, showHeaders: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showControls">Kontrol Zoom/Pan</Label>
                      <Switch
                        id="showControls"
                        checked={config.showControls}
                        onCheckedChange={(checked) => setConfig({ ...config, showControls: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showMiniMap">Mini Map</Label>
                      <Switch
                        id="showMiniMap"
                        checked={config.showMiniMap}
                        onCheckedChange={(checked) => setConfig({ ...config, showMiniMap: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showBackground">Grid Background</Label>
                      <Switch
                        id="showBackground"
                        checked={config.showBackground}
                        onCheckedChange={(checked) => setConfig({ ...config, showBackground: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="interactive">Mode Interaktif</Label>
                      <Switch
                        id="interactive"
                        checked={config.interactive}
                        onCheckedChange={(checked) => setConfig({ ...config, interactive: checked })}
                      />
                    </div>
                    {config.interactive && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showHandlesToggle">Toggle Titik Penghubung</Label>
                        <Switch
                          id="showHandlesToggle"
                          checked={config.showHandlesToggle}
                          onCheckedChange={(checked) => setConfig({ ...config, showHandlesToggle: checked })}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview Button */}
                <Button onClick={openPreview} variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Embed
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Code Generation */}
            <div className="space-y-6">
              {/* Embed URL */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">URL Embed</CardTitle>
                  <CardDescription>
                    Link langsung ke diagram yang dapat di-embed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      value={generateEmbedUrl()}
                      readOnly
                      className="flex-1 font-mono text-sm"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generateEmbedUrl())}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* HTML iframe Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kode HTML (iframe)</CardTitle>
                  <CardDescription>
                    Salin kode ini untuk menampilkan diagram di website HTML
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Textarea
                      value={generateIframeCode()}
                      readOnly
                      className="font-mono text-sm resize-none"
                      rows={6}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(generateIframeCode())}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* React Component Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kode React Component</CardTitle>
                  <CardDescription>
                    Untuk integrasi langsung dalam aplikasi React
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Textarea
                      value={generateReactCode()}
                      readOnly
                      className="font-mono text-sm resize-none"
                      rows={10}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(generateReactCode())}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Catatan Penggunaan</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Mode interaktif memungkinkan pengguna untuk drag node dan membuat koneksi baru</li>
                    <li>Mini map memberikan navigasi yang lebih mudah untuk diagram besar</li>
                    <li>Grid background membantu visualisasi struktur diagram</li>
                    <li>Kontrol zoom/pan dapat dinonaktifkan untuk tampilan yang lebih bersih</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedGenerator; 