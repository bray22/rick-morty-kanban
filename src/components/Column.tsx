import type { ColumnId, KanbanItem } from '../types';
import { Card } from './Card';

interface ColumnProps {
  id: ColumnId;
  title: string;
  items: KanbanItem[];
  onDelete: (itemId: string) => void;
  onDragStart: (payload: { item: KanbanItem; fromColumn: ColumnId }) => void;
  isDragOver?: boolean;
  onDropOnCard: (toColumn: ColumnId, targetItemId: string) => void;
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

export function Column({
  id,
  title,
  items,
  onDelete,
  onDragStart,
  isDragOver,
  onDropOnCard,
}: ColumnProps) {
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
          <span
            role="img"
            aria-label={`${title} column icon`}
            style={{ fontSize: 16, color: cfg.accent, lineHeight: 1 }}
          >
            {cfg.icon}
          </span>
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

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        border: `2px dashed ${isDragOver ? cfg.accent : '#DADCE0'}`,
        background: isDragOver ? cfg.chipBg : '#FFFFFF',
        borderRadius: 12,
        padding: '16px',
        minHeight: 140,
        transition: 'all 0.15s ease',
        overflowY: 'auto',
      }}>
        {items.length === 0 ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            color: isDragOver ? cfg.chipColor : '#9AA0A6',
            fontSize: 13,
            textAlign: 'center',
            minHeight: 140,
          }}>
            <div style={{ fontSize: 24 }} aria-hidden="true">{cfg.icon}</div>
            <strong style={{ fontSize: 14 }}>
              {isDragOver ? `Drop in ${title}` : `No cards in ${title}`}
            </strong>
            <span style={{ fontSize: 12 }}>
              {isDragOver ? 'Release to move this card here' : 'Drag a card here or create a new task'}
            </span>
          </div>
        ) : (
          items.map((item) => (
            <Card
              key={item.id}
              item={item}
              onDelete={onDelete}
              onDragStart={(item) => onDragStart({ item, fromColumn: id })}
              onDropOnCard={(targetItemId) => onDropOnCard(id, targetItemId)}
            />
          ))
        )}
      </div>
    </div>
  );
}
