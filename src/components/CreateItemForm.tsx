import { useState } from 'react';
import type { Character } from '../types';

interface CreateItemFormProps {
  characters: Character[];
  onSubmit: (title: string, characterId: string) => void;
  isLoading: boolean;
}

export function CreateItemForm({ characters, onSubmit, isLoading }: CreateItemFormProps) {
  const [title, setTitle] = useState('');
  const [characterId, setCharacterId] = useState(characters[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && characterId) {
      onSubmit(title, characterId);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_100px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-semibold text-2xl text-white mb-1">Create New Item</h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Add a task and assign it to a Rick & Morty character to keep your board moving with premium style.
          </p>
        </div>
        <button
          type="submit"
          disabled={!title.trim() || isLoading}
          className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700/70"
        >
          Add Item
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <input
          type="text"
          placeholder="Item title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-3xl border border-slate-700/70 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 disabled:bg-slate-900/60"
        />
        <select
          value={characterId}
          onChange={(e) => setCharacterId(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-3xl border border-slate-700/70 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 disabled:bg-slate-900/60"
        >
          {characters.map((char) => (
            <option key={char.id} value={char.id} className="bg-slate-950 text-slate-100">
              {char.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
