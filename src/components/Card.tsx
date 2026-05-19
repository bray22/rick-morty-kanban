import { useState } from 'react';
import type { KanbanItem } from '../types';

// interface CardProps {
//   item: KanbanItem;
//   onDelete: (itemId: string) => void;
//   onDragStart: (item: KanbanItem) => void;
// }
interface CardProps {
  item: KanbanItem
  onDelete: (itemId: string) => void
  onDragStart: (item: KanbanItem) => void
  onDropOnCard: (targetItemId: string) => void
}
export function Card({ item, onDelete, onDragStart, onDropOnCard }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const [deleteHovered, setDeleteHovered] = useState(false);

  return (
    <div
      draggable
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
      e.stopPropagation()
      onDropOnCard(item.id)
      }}
      onDragStart={() => onDragStart(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setDeleteHovered(false); }}
      style={{
        background: '#fff',
        borderRadius: 12,
        padding: '14px 16px',
        boxShadow: hovered
          ? '0 4px 16px rgba(32,33,36,0.15), 0 1px 4px rgba(32,33,36,0.08)'
          : '0 1px 3px rgba(32,33,36,0.1), 0 1px 2px rgba(32,33,36,0.06)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        cursor: 'grab',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <img
          src={item.character.image}
          alt={item.character.name}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
            border: '2px solid #E8EAED',
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: '0 0 4px',
            fontSize: 14,
            fontWeight: 500,
            color: '#202124',
            lineHeight: 1.4,
            wordBreak: 'break-word',
          }}>
            {item.title}
          </p>
          <p style={{
            margin: 0,
            fontSize: 12,
            color: '#5F6368',
            letterSpacing: '0.01em',
          }}>
            {item.character.name}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDelete(item.id)}
        onMouseEnter={() => setDeleteHovered(true)}
        onMouseLeave={() => setDeleteHovered(false)}
        style={{
          marginTop: 12,
          width: '100%',
          padding: '7px 0',
          borderRadius: 8,
          border: deleteHovered ? '1px solid #D93025' : '1px solid #DADCE0',
          background: deleteHovered ? '#FFF1F0' : 'transparent',
          color: deleteHovered ? '#D93025' : '#80868B',
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          letterSpacing: '0.01em',
        }}
      >
        Remove
      </button>
    </div>
  );
}
