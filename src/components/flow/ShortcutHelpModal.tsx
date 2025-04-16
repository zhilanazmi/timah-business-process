useEffect(() => {
  setNodes(nds => 
    nds.map(node => {
      if (node.data.isHeader) {
        const color = node.data.color;
        return {
          ...node,
          data: {
            ...node.data,
            onHeaderUpdate: handleHeaderUpdate
          },
          style: {
            ...node.style,
            backgroundColor: color && (color.startsWith('#') || color.startsWith('rgb')) 
              ? color 
              : undefined
          }
        };
      }
      return node;
    })
  );
}, [currentPageId]); 