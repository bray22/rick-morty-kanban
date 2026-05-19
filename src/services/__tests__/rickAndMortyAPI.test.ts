import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fetchCharacters } from '../rickAndMortyAPI'

describe('rickAndMortyAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch characters successfully', async () => {
    const mockData = {
      data: {
        characters: {
          results: [
            {
              id: '1',
              name: 'Rick',
              image: 'https://example.com/rick.jpg',
            },
            {
              id: '2',
              name: 'Morty',
              image: 'https://example.com/morty.jpg',
            },
          ],
        },
      },
    }

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response)

    const characters = await fetchCharacters()

    expect(characters).toHaveLength(2)
    expect(characters[0].name).toBe('Rick')
    expect(characters[1].name).toBe('Morty')
  })

  it('should handle API errors gracefully', async () => {
    const mockError = {
      errors: [{ message: 'API Error' }],
    }

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockError,
    } as Response)

    await expect(fetchCharacters()).rejects.toThrow('API Error')
  })

  it('should handle network errors', async () => {
    globalThis.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'))

    await expect(fetchCharacters()).rejects.toThrow('Network error')
  })

  it('should handle non-ok response status', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response)

    await expect(fetchCharacters()).rejects.toThrow('HTTP error: 500')
  })
})