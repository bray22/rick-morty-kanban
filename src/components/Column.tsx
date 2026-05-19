import type { ColumnId, KanbanItem } from '../types';
import { Card } from './Card';

interface ColumnProps {
  id: ColumnId;
  title: string;
  items: KanbanItem[];
  onDelete: (itemId: string) => void;
  onDragStart: (payload: { item: KanbanItem; fromColumn: ColumnId }) => void;
  isDragOver?: boolean;
}

const COLUMN_CONFIG: Record<ColumnId, { accent: string; chipBg: string; chipColor: string; icon: string }> = {
  todo: {
    accent: '#4285F4',
    chipBg: '#E8F0FE',
    chipColor: '#1A73E8',
    icon: '○',
  },
  doing: {
    accent: '#F9AB00',
    chipBg: '#FEF7E0',
    chipColor: '#B06000',
    icon: '◑',
  },
  done: {
    accent: '#34A853',
    chipBg: '#E6F4EA',
    chipColor: '#137333',
    icon: '●',
  },
};

export function Column({ id, title, items, onDelete, onDragStart, isDragOver }: ColumnProps) {
  const cfg = COLUMN_CONFIG[id];

  return (
    <div style={{
      background: isDragOver ? '#F1F3F4' : '#F8F9FA',
      borderRadius: 16,
      padding: 16,
      minHeight: 520,
      display: 'flex',
      flexDirection: 'column',
      border: isDragOver ? `2px solid ${cfg.accent}` : '2px solid transparent',
      transition: 'border-color 0.15s ease, background 0.15s ease',
    }}>
      {/* Column header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingBottom: 14,
        borderBottom: `2px solid ${cfg.accent}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16, color: cfg.accent, lineHeight: 1 }}>{cfg.icon}</span>
          <h2 style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: '#202124',
            letterSpacing: '-0.01em',
          }}>
            {title}
          </h2>
        </div>
        <span style={{
          background: cfg.chipBg,
          color: cfg.chipColor,
          fontSize: 12,
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: 12,
          minWidth: 24,
          textAlign: 'center',
        }}>
          {items.length}
        </span>
      </div>

      {/* Cards */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.length === 0 ? (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #DADCE0',
            borderRadius: 12,
            padding: '32px 16px',
            color: '#9AA0A6',
            fontSize: 13,
            textAlign: 'center',
            minHeight: 120,
          }}>
            Drop items here
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
