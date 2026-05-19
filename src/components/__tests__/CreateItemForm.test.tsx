import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CreateItemForm } from '../CreateItemForm'
import type { Character } from '../../types'

const mockCharacters: Character[] = [
  { id: '1', name: 'Rick', image: 'https://example.com/rick.jpg' },
  { id: '2', name: 'Morty', image: 'https://example.com/morty.jpg' },
]

describe('CreateItemForm Component', () => {
  it('should render form with input and button', () => {
    const mockSubmit = vi.fn()

    render(
      <CreateItemForm
        characters={mockCharacters}
        onSubmit={mockSubmit}
        isLoading={false}
      />
    )

    expect(screen.getByPlaceholderText('Item title...')).toBeInTheDocument()
    expect(screen.getByText('Add Item')).toBeInTheDocument()
  })

  it('should display all characters in select', () => {
    render(
      <CreateItemForm
        characters={mockCharacters}
        onSubmit={vi.fn()}
        isLoading={false}
      />
    )

    expect(screen.getByDisplayValue('Rick')).toBeInTheDocument()
    const select = screen.getByDisplayValue('Rick')
    const options = (select as HTMLSelectElement).options
    expect(options.length).toBe(2)
  })

  it('should submit form with title and character', async () => {
    const user = userEvent.setup()
    const mockSubmit = vi.fn()

    render(
      <CreateItemForm
        characters={mockCharacters}
        onSubmit={mockSubmit}
        isLoading={false}
      />
    )

    const input = screen.getByPlaceholderText('Item title...')
    await user.type(input, 'New Task')
    await user.click(screen.getByText('Add Item'))

    expect(mockSubmit).toHaveBeenCalledWith('New Task', '1')
  })

  it('should clear input after submission', async () => {
    const user = userEvent.setup()

    render(
      <CreateItemForm
        characters={mockCharacters}
        onSubmit={vi.fn()}
        isLoading={false}
      />
    )

    const input = screen.getByPlaceholderText('Item title...') as HTMLInputElement
    await user.type(input, 'New Task')
    await user.click(screen.getByText('Add Item'))

    expect(input.value).toBe('')
  })

  it('should disable button when input is empty', async () => {
    render(
      <CreateItemForm
        characters={mockCharacters}
        onSubmit={vi.fn()}
        isLoading={false}
      />
    )

    const button = screen.getByText('Add Item')
    expect(button).toBeDisabled()
  })

  it('should disable form when loading', () => {
    render(
      <CreateItemForm
        characters={mockCharacters}
        onSubmit={vi.fn()}
        isLoading={true}
      />
    )

    const input = screen.getByPlaceholderText('Item title...') as HTMLInputElement
    const select = screen.getByDisplayValue('Rick') as HTMLSelectElement
    const button = screen.getByText('Add Item') as HTMLButtonElement

    expect(input.disabled).toBe(true)
    expect(select.disabled).toBe(true)
    expect(button.disabled).toBe(true)
  })
})
