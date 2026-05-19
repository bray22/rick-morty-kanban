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
    <div className="flex-1 bg-slate-900/75 border border-white/10 rounded-[2rem] p-5 h-[600px] flex flex-col shadow-xl shadow-slate-950/20 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h2 className={`font-semibold text-lg ${isDone ? 'text-emerald-300' : 'text-slate-100'}`}>
            {title}
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div className={`rounded-full px-3 py-1 text-[11px] font-semibold ${isDone ? 'bg-emerald-500/15 text-emerald-200' : 'bg-slate-800/80 text-slate-300'}`}>
          {isDone ? 'Completed' : 'In progress'}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700/80 bg-slate-950/50 p-8 text-center text-slate-500 text-sm">
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
