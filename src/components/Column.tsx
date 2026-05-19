import type { ColumnId, KanbanItem } from '../types';
import { Card } from './Card';

interface ColumnProps {
  id: ColumnId;
  title: string;
  items: KanbanItem[];
  onDelete: (itemId: string) => void;
  onDragStart: (payload: { item: KanbanItem; fromColumn: ColumnId }) => void;
}

export function Column({ id, title, items, onDelete, onDragStart }: ColumnProps) {
  const isDone = id === 'done';

  return (
    <div className="flex-1 bg-gray-50 rounded-lg p-4 h-[600px] flex flex-col">
      <h2 className={`font-bold text-lg mb-4 ${isDone ? 'text-green-700' : 'text-gray-700'}`}>
        {title}
      </h2>
      <div className="flex-1 overflow-y-auto space-y-2">
        {items.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            No items yet
          </div>
        ) : (
          items.map((item) => (
            <Card
              key={item.id}
              item={item}
              onDelete={onDelete}
              onDragStart={(item) => onDragStart({ item, fromColumn: id })}
            />
          ))
        )}
      </div>
    </div>
  );
}
