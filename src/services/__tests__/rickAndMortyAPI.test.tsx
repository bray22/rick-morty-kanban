import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fetchCharacters } from '../rickAndMortyAPI'

describe('fetchCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch and return characters', async () => {
    const mockResponse = {
      data: {
        characters: {
          results: [
            {
              id: '1',
              name: 'Rick Sanchez',
              image: 'https://example.com/rick.png',
            },
            {
              id: '2',
              name: 'Morty Smith',
              image: 'https://example.com/morty.png',
            },
          ],
        },
      },
    }

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const characters = await fetchCharacters()

    expect(globalThis.fetch).toHaveBeenCalledTimes(1)

    expect(characters).toEqual([
      {
        id: '1',
        name: 'Rick Sanchez',
        image: 'https://example.com/rick.png',
      },
      {
        id: '2',
        name: 'Morty Smith',
        image: 'https://example.com/morty.png',
      },
    ])
  })

  it('should throw for HTTP errors', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response)

    await expect(fetchCharacters()).rejects.toThrow('HTTP error: 500')
  })

  it('should throw GraphQL errors', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        errors: [{ message: 'GraphQL Error' }],
      }),
    } as Response)

    await expect(fetchCharacters()).rejects.toThrow('GraphQL Error')
  })

  it('should throw network errors', async () => {
    globalThis.fetch = vi.fn().mockRejectedValueOnce(
      new Error('Network Error')
    )

    await expect(fetchCharacters()).rejects.toThrow('Network Error')
  })
})