import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card } from '../Card'
import type { KanbanItem } from '../../types'

const mockItem: KanbanItem = {
  id: '1',
  title: 'Test Task',
  characterId: 'char1',
  character: {
    id: 'char1',
    name: 'Rick',
    image: 'https://example.com/rick.jpg',
  },
}

describe('Card Component', () => {
  it('should render card with item details', () => {
    const mockDelete = vi.fn()
    const mockDragStart = vi.fn()

    render(
      <Card 
        item={mockItem} 
        onDelete={mockDelete}
        onDragStart={mockDragStart}
      />
    )

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Rick')).toBeInTheDocument()
    expect(screen.getByAltText('Rick')).toHaveAttribute('src', 'https://example.com/rick.jpg')
  })

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    const mockDelete = vi.fn()
    const mockDragStart = vi.fn()

    render(
      <Card 
        item={mockItem} 
        onDelete={mockDelete}
        onDragStart={mockDragStart}
      />
    )

    const deleteButton = screen.getByText('Delete')
    await user.click(deleteButton)

    expect(mockDelete).toHaveBeenCalledWith('1')
  })

  it('should call onDragStart when dragging starts', async () => {
    const mockDelete = vi.fn()
    const mockDragStart = vi.fn()

    const { container } = render(
      <Card 
        item={mockItem} 
        onDelete={mockDelete}
        onDragStart={mockDragStart}
      />
    )

    const cardElement = container.querySelector('[draggable="true"]')
    expect(cardElement).toBeInTheDocument()

    if (cardElement) {
      cardElement.dispatchEvent(new DragEvent('dragstart'))
      expect(mockDragStart).toHaveBeenCalledWith(mockItem)
    }
  })
})
