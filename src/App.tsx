import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { fetchCharacters } from './services/rickAndMortyAPI';
import type { Character, KanbanItem, ColumnId } from './types';
import { Column } from './components/Column';
import { CreateItemForm } from './components/CreateItemForm';
import './App.css';

interface BoardState {
  todo: KanbanItem[];
  doing: KanbanItem[];
  done: KanbanItem[];
}

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'doing', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [board, setBoard] = useState<BoardState>({ todo: [], doing: [], done: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<{ item: KanbanItem; fromColumn: ColumnId } | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ColumnId | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchCharacters()
      .then(setCharacters)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateItem = (title: string, characterId: string) => {
    const character = characters.find((c) => c.id === characterId);
    if (!character) return;

    const newItem: KanbanItem = {
      id: `item-${Date.now()}`,
      title,
      characterId,
      character,
    };

    setBoard((prev) => ({
      ...prev,
      todo: [newItem, ...prev.todo],
    }));
  };

  const handleDeleteItem = (itemId: string) => {
    setBoard((prev) => ({
      todo: prev.todo.filter((i) => i.id !== itemId),
      doing: prev.doing.filter((i) => i.id !== itemId),
      done: prev.done.filter((i) => i.id !== itemId),
    }));
  };

  const handleDragOver = (e: React.DragEvent, colId: ColumnId) => {
    e.preventDefault();
    setDragOverColumn(colId);
  };

  const triggerConfettiIfDone = (toColumn: ColumnId, fromColumn: ColumnId) => {
    if (toColumn === 'done' && fromColumn !== 'done') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
  };

  const handleDrop = (toColumn: ColumnId) => {
    if (!draggedItem) return;

    const { item, fromColumn } = draggedItem;

    if (fromColumn !== toColumn) {
      setBoard((prev) => {
        const next = { ...prev };

        next[fromColumn] = next[fromColumn].filter((i) => i.id !== item.id);
        next[toColumn] = [item, ...next[toColumn]];

        return next;
      });

      triggerConfettiIfDone(toColumn, fromColumn);
    }

    setDraggedItem(null);
    setDragOverColumn(null);
  };

  const handleDropOnCard = (toColumn: ColumnId, targetItemId: string) => {
    if (!draggedItem) return;

    const { item, fromColumn } = draggedItem;

    if (item.id === targetItemId) {
      setDraggedItem(null);
      setDragOverColumn(null);
      return;
    }

    setBoard((prev) => {
      const next = { ...prev };

      next[fromColumn] = next[fromColumn].filter((i) => i.id !== item.id);

      const targetIndex = next[toColumn].findIndex((i) => i.id === targetItemId);

      if (targetIndex === -1) {
        next[toColumn] = [item, ...next[toColumn]];
      } else {
        next[toColumn] = [
          ...next[toColumn].slice(0, targetIndex),
          item,
          ...next[toColumn].slice(targetIndex),
        ];
      }

      return next;
    });

    triggerConfettiIfDone(toColumn, fromColumn);

    setDraggedItem(null);
    setDragOverColumn(null);
  };

  const totalItems = board.todo.length + board.doing.length + board.done.length;

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#F8F9FA',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40,
            height: 40,
            border: '3px solid #E8EAED',
            borderTopColor: '#1A73E8',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <p style={{ color: '#5F6368', fontSize: 14, margin: 0 }}>Loading characters…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#F8F9FA',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: '24px 28px',
          boxShadow: '0 1px 3px rgba(32,33,36,0.12)',
          borderLeft: '4px solid #D93025',
          maxWidth: 400,
        }}>
          <p style={{ fontWeight: 600, color: '#D93025', margin: '0 0 8px' }}>Failed to load</p>
          <p style={{ color: '#5F6368', fontSize: 14, margin: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA' }}>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      <div style={{
        background: '#fff',
        borderBottom: '1px solid #E8EAED',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 1px 4px rgba(32,33,36,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#1A73E8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}>
            🎬
          </div>
          <div>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#202124' }}>Rick & Morty</span>
            <span style={{ fontSize: 16, fontWeight: 400, color: '#5F6368', marginLeft: 6 }}>Kanban</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {COLUMNS.map((col) => {
            const count = board[col.id].length;
            const colors: Record<string, string> = { todo: '#1A73E8', doing: '#F9AB00', done: '#34A853' };
            const bgColors: Record<string, string> = { todo: '#E8F0FE', doing: '#FEF7E0', done: '#E6F4EA' };
            const textColors: Record<string, string> = { todo: '#1558B0', doing: '#B06000', done: '#137333' };

            return (
              <div key={col.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: bgColors[col.id],
                borderRadius: 20,
                padding: '4px 12px',
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: colors[col.id],
                }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: textColors[col.id] }}>
                  {col.title} · {count}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: 13, color: '#9AA0A6' }}>
          {totalItems} {totalItems === 1 ? 'card' : 'cards'} total
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px' }}>
        <CreateItemForm
          characters={characters}
          onSubmit={handleCreateItem}
          isLoading={false}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {COLUMNS.map((col) => (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={() => setDragOverColumn(null)}
              onDrop={() => handleDrop(col.id)}
            >
              <Column
                id={col.id}
                title={col.title}
                items={board[col.id]}
                onDelete={handleDeleteItem}
                onDragStart={setDraggedItem}
                onDropOnCard={handleDropOnCard}
                isDragOver={dragOverColumn === col.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}