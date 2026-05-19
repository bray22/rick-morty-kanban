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
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-5 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.9)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_68px_-28px_rgba(56,189,248,0.35)]"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500"></div>
      <div className="flex gap-3">
        <img
          src={item.character.image}
          alt={item.character.name}
          className="w-14 h-14 rounded-full object-cover border border-white/10 shadow-sm"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-slate-100 leading-5 break-words">
            {item.title}
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mt-2">
            {item.character.name}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onDelete(item.id)}
        className="mt-5 w-full rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:border-rose-400/40 hover:bg-rose-500/15"
      >
        Delete item
      </button>
    </div>
  );
}
