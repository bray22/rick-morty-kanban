import type { Character } from '../types';

const API_URL = 'https://rickandmortyapi.com/graphql';

export async function fetchCharacters(): Promise<Character[]> {
  const query = `
    query {
      characters(page: 1) {
        results {
          id
          name
          image
        }
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data.characters.results.map((character: any) => ({
    id: character.id,
    name: character.name,
    image: character.image,
  }));
}