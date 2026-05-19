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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="font-bold text-lg mb-4 text-gray-900">Create New Item</h2>
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Item title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <select
          value={characterId}
          onChange={(e) => setCharacterId(e.target.value)}
          disabled={isLoading}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        >
          {characters.map((char) => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!title.trim() || isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors font-semibold"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
