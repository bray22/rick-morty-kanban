import type { Character } from '../types';

const API_URL = 'https://rickandmortyapi.com/graphql';

export async function fetchCharacters(): Promise<Character[]> {
  const query = `
    query {
      characters(first: 20) {
        edges {
          node {
            id
            name
            image
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const characters: Character[] = data.data.characters.edges.map(
      (edge: any) => ({
        id: edge.node.id,
        name: edge.node.name,
        image: edge.node.image,
      })
    );

    return characters;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
}
