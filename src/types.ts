export interface Character {
  id: string;
  name: string;
  image: string;
}

export interface KanbanItem {
  id: string;
  title: string;
  characterId: string;
  character: Character;
}

export type ColumnId = 'todo' | 'doing' | 'done';
