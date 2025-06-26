import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// --- TYPES ---
interface RFP {
  id: string;
  title: string;
  company: string;
  value: number;
  dueDate: string;
}

interface Column {
  name: string;
  items: RFP[];
}

interface Columns {
  [key: string]: Column;
}

// --- MOCK DATA ---
const initialRFPs: Columns = {
  new: {
    name: 'New',
    items: [
      { id: 'rfp-1', title: 'Cloud Infrastructure Overhaul', company: 'Innovate Corp', value: 250000, dueDate: '2024-09-15' },
      { id: 'rfp-2', title: 'Cybersecurity Solutions', company: 'SecureNet', value: 120000, dueDate: '2024-09-20' },
    ],
  },
  inProgress: {
    name: 'In Progress',
    items: [
      { id: 'rfp-3', title: 'Data Analytics Platform', company: 'DataDriven Inc.', value: 350000, dueDate: '2024-08-30' },
    ],
  },
  submitted: {
    name: 'Submitted',
    items: [
      { id: 'rfp-4', title: 'Website Redesign', company: 'Creative Solutions', value: 80000, dueDate: '2024-08-10' },
    ],
  },
  won: {
    name: 'Won',
    items: [
        { id: 'rfp-5', title: 'Managed IT Services', company: 'TechPro', value: 150000, dueDate: '2024-07-20' },
    ],
  },
  lost: {
    name: 'Lost',
    items: [
        { id: 'rfp-6', title: 'E-commerce Platform', company: 'RetailGiant', value: 200000, dueDate: '2024-07-15' },
    ],
  },
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(initialRFPs);
  const [draggedItem, setDraggedItem] = useState<{ cardId: string; sourceColumnId: string } | null>(null);
  console.log('KanbanBoard loaded');

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, cardId: string, sourceColumnId: string) => {
    setDraggedItem({ cardId, sourceColumnId });
    e.dataTransfer.effectAllowed = 'move';
    // Use dataTransfer to ensure compatibility, though state is primary
    e.dataTransfer.setData('text/plain', JSON.stringify({ cardId, sourceColumnId }));
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { cardId, sourceColumnId } = draggedItem;

    if (sourceColumnId === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    const sourceColumn = { ...columns[sourceColumnId] };
    const targetColumn = { ...columns[targetColumnId] };
    const sourceItems = [...sourceColumn.items];
    const targetItems = [...targetColumn.items];

    const dragIndex = sourceItems.findIndex(item => item.id === cardId);
    const [removed] = sourceItems.splice(dragIndex, 1);
    targetItems.push(removed);

    setColumns({
      ...columns,
      [sourceColumnId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [targetColumnId]: {
        ...targetColumn,
        items: targetItems,
      },
    });

    setDraggedItem(null);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  return (
    <div className="flex space-x-4 p-4 overflow-x-auto bg-gray-50 dark:bg-gray-900 h-full">
      {Object.entries(columns).map(([columnId, column]) => (
        <div
          key={columnId}
          className="flex-shrink-0 w-80"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, columnId)}
        >
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm h-full flex flex-col">
            <h2 className="p-4 text-lg font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-700">
              {column.name} <Badge variant="secondary" className="ml-2">{column.items.length}</Badge>
            </h2>
            <div className="p-2 space-y-2 flex-grow overflow-y-auto">
              {column.items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id, columnId)}
                  onDragEnd={handleDragEnd}
                  className="cursor-move"
                >
                  <Link to="/r-f-p-detail-submission" className="block">
                    <Card className="hover:shadow-md hover:border-primary transition-all duration-200">
                      <CardHeader className="p-4">
                        <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-sm space-y-2">
                        <p className="font-semibold text-primary">{item.company}</p>
                        <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                           <Badge variant="outline">
                            ${(item.value / 1000).toFixed(0)}k
                           </Badge>
                           <span>Due: {item.dueDate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
              {column.items.length === 0 && (
                <div className="p-4 text-center text-sm text-gray-500">
                  Drop cards here
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;