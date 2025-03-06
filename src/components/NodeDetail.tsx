
import { Node } from 'reactflow';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface NodeDetailProps {
  node: Node;
  onClose: () => void;
}

const NodeDetail = ({ node, onClose }: NodeDetailProps) => {
  return (
    <div className="w-80 border-l border-gray-200">
      <Card className="border-0 rounded-none h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-medium">{node.data.label}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="text-sm mt-1">{node.data.description || 'No description available'}</p>
            </div>
            {node.data.details && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Details</h3>
                <div className="text-sm mt-1 space-y-2">
                  {Object.entries(node.data.details).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}: </span>
                      <span>{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline" className="w-full" onClick={() => {
            console.log('Edit node:', node.id);
          }}>
            Edit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NodeDetail;
