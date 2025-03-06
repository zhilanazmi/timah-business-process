
import { Node } from 'reactflow';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface NodeDetailProps {
  node: Node;
  onClose: () => void;
}

const NodeDetail = ({ node, onClose }: NodeDetailProps) => {
  const handleEdit = () => {
    // In a real app, you would open a form or dialog here
    // For simplicity, we're using prompts
    const newLabel = prompt('Edit label:', node.data.label);
    if (newLabel) {
      // This is just a mock - in a real app, you would update the node in the flow
      console.log('Update node:', { ...node, data: { ...node.data, label: newLabel } });
      toast.success('Node updated (mocked)');
    }
  };

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
            <div>
              <h3 className="text-sm font-medium text-gray-500">Column</h3>
              <p className="text-sm mt-1 capitalize">{node.data.column || 'Not assigned'}</p>
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
            <div>
              <h3 className="text-sm font-medium text-gray-500">Technical Info</h3>
              <p className="text-sm mt-1">ID: {node.id}</p>
              <p className="text-sm">Position: x={Math.round(node.position.x)}, y={Math.round(node.position.y)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline" className="w-full" onClick={handleEdit}>
            Edit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NodeDetail;
