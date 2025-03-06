
import { ReactNode } from 'react';

interface FlowColumnProps {
  title: string;
  color?: string;
  children: ReactNode;
}

const FlowColumn = ({ title, color = 'bg-blue-900', children }: FlowColumnProps) => {
  return (
    <div className="flex flex-col h-full min-w-[200px]">
      <div className={`${color} text-white px-4 py-2 font-semibold rounded-t-md`}>
        {title}
      </div>
      <div className="flex-1 border border-gray-200 rounded-b-md p-4 bg-white bg-opacity-50">
        {children}
      </div>
    </div>
  );
};

export default FlowColumn;
