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
  const [titleFocused, setTitleFocused] = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && characterId) {
      onSubmit(title, characterId);
      setTitle('');
    }
  };

  const isValid = title.trim().length > 0 && !!characterId;

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff',
      borderRadius: 16,
      padding: '20px 24px',
      marginBottom: 24,
      boxShadow: '0 1px 3px rgba(32,33,36,0.1), 0 1px 2px rgba(32,33,36,0.06)',
    }}>
      <div style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-end',
        flexWrap: 'wrap',
      }}>
        {/* Title input */}
        <div style={{ flex: '2 1 240px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, fontWeight: 500, color: '#5F6368', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            Task title
          </label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
            disabled={isLoading}
            style={{
              padding: '10px 14px',
              border: titleFocused ? '2px solid #1A73E8' : '2px solid #DADCE0',
              borderRadius: 8,
              fontSize: 14,
              color: '#202124',
              outline: 'none',
              background: '#fff',
              transition: 'border-color 0.15s ease',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Character select */}
        <div style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, fontWeight: 500, color: '#5F6368', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            Assign to
          </label>
          <select
            value={characterId}
            onChange={(e) => setCharacterId(e.target.value)}
            onFocus={() => setSelectFocused(true)}
            onBlur={() => setSelectFocused(false)}
            disabled={isLoading}
            style={{
              padding: '10px 14px',
              border: selectFocused ? '2px solid #1A73E8' : '2px solid #DADCE0',
              borderRadius: 8,
              fontSize: 14,
              color: '#202124',
              outline: 'none',
              background: '#fff',
              transition: 'border-color 0.15s ease',
              width: '100%',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235F6368' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: 36,
            }}
          >
            {characters.map((char) => (
              <option key={char.id} value={char.id}>{char.name}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || isLoading}
          style={{
            flexShrink: 0,
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: isValid ? '#1A73E8' : '#DADCE0',
            color: isValid ? '#fff' : '#9AA0A6',
            fontSize: 14,
            fontWeight: 600,
            cursor: isValid ? 'pointer' : 'not-allowed',
            transition: 'background 0.15s ease, transform 0.1s ease',
            height: 42,
            letterSpacing: '0.01em',
          }}
          onMouseEnter={(e) => { if (isValid) (e.target as HTMLButtonElement).style.background = '#1558B0'; }}
          onMouseLeave={(e) => { if (isValid) (e.target as HTMLButtonElement).style.background = '#1A73E8'; }}
        >
          Add to board
        </button>
      </div>
    </form>
  );
}
