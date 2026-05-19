import type { KanbanItem } from '../types';

interface CardProps {
  item: KanbanItem;
  onDelete: (itemId: string) => void;
  onDragStart: (item: KanbanItem) => void;
}

export function Card({ item, onDelete, onDragStart }: CardProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(item)}
      className="bg-white rounded-lg shadow p-4 mb-3 hover:shadow-md transition-shadow"
    >
      <div className="flex gap-3">
        <img
          src={item.character.image}
          alt={item.character.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-gray-900 break-words">
            {item.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            {item.character.name}
          </p>
        </div>
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="mt-3 w-full text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded px-2 py-1 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
