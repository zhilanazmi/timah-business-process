import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PerencanaanProduksiEmbed from '../../components/embeds/PerencanaanProduksiEmbed';

const PerencanaanProduksiEmbedPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [config, setConfig] = useState({
    height: '100vh',
    width: '100%',
    showControls: true,
    showMiniMap: false,
    showBackground: true,
    interactive: false,
    showTitle: true,
    showHeaders: true,
    showHandlesToggle: true,
  });

  useEffect(() => {
    // Parse URL parameters to configure the embed
    const height = searchParams.get('height') || '100vh';
    const width = searchParams.get('width') || '100%';
    const showControls = searchParams.get('controls') !== 'false';
    const showMiniMap = searchParams.get('minimap') === 'true';
    const showBackground = searchParams.get('background') !== 'false';
    const interactive = searchParams.get('interactive') === 'true';
    const showTitle = searchParams.get('title') !== 'false';
    const showHeaders = searchParams.get('headers') !== 'false';
    const showHandlesToggle = searchParams.get('handlesToggle') !== 'false';

          setConfig({
        height,
        width,
        showControls,
        showMiniMap,
        showBackground,
        interactive,
        showTitle,
        showHeaders,
        showHandlesToggle,
      });
  }, [searchParams]);

  return (
    <div className="embed-page" style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
              <PerencanaanProduksiEmbed
          height={config.height}
          width={config.width}
          showControls={config.showControls}
          showMiniMap={config.showMiniMap}
          showBackground={config.showBackground}
          interactive={config.interactive}
          showTitle={config.showTitle}
          showHeaders={config.showHeaders}
          showHandlesToggle={config.showHandlesToggle}
          className="h-full w-full"
        />
    </div>
  );
};

export default PerencanaanProduksiEmbedPage; 