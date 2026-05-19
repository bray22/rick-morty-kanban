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

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [board, setBoard] = useState<BoardState>({
    todo: [],
    doing: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<{ item: KanbanItem; fromColumn: ColumnId } | null>(null);
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
      todo: prev.todo.filter((item) => item.id !== itemId),
      doing: prev.doing.filter((item) => item.id !== itemId),
      done: prev.done.filter((item) => item.id !== itemId),
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (toColumn: ColumnId) => {
    if (!draggedItem) return;

    const { item, fromColumn } = draggedItem;

    if (fromColumn === toColumn) {
      setDraggedItem(null);
      return;
    }

    setBoard((prev) => {
      const newBoard = { ...prev };
      newBoard[fromColumn] = newBoard[fromColumn].filter((i) => i.id !== item.id);
      newBoard[toColumn] = [item, ...newBoard[toColumn]];
      return newBoard;
    });

    if (toColumn === 'done') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    setDraggedItem(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading characters...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-800 font-semibold">Error Loading Characters</p>
          <p className="text-red-700 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-10 rounded-[2rem] border border-white/10 bg-slate-950/75 shadow-[0_60px_120px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse"></span>
            Premium workflow
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-white mb-3">Rick & Morty Kanban</h1>
          <p className="max-w-2xl text-slate-300 leading-7">
            Organize your tasks with character-powered productivity, elegant motion, and a refined board experience.
          </p>
        </div>

        <CreateItemForm
          characters={characters}
          onSubmit={handleCreateItem}
          isLoading={false}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div
            onDragOver={handleDragOver}
            onDrop={() => handleDrop('todo')}
            className="flex-1"
          >
            <Column
              id="todo"
              title="To Do"
              items={board.todo}
              onDelete={handleDeleteItem}
              onDragStart={setDraggedItem}
            />
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={() => handleDrop('doing')}
            className="flex-1"
          >
            <Column
              id="doing"
              title="Doing"
              items={board.doing}
              onDelete={handleDeleteItem}
              onDragStart={setDraggedItem}
            />
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={() => handleDrop('done')}
            className="flex-1"
          >
            <Column
              id="done"
              title="Done"
              items={board.done}
              onDelete={handleDeleteItem}
              onDragStart={setDraggedItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
