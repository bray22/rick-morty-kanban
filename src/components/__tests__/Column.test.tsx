import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Column } from '../Column'
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

describe('Column Component', () => {
  it('should render empty state when no items', () => {
    render(
      <Column
        id="todo"
        title="To Do"
        items={[]}
        onDelete={vi.fn()}
        onDragStart={vi.fn()}
      />
    )

    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('No items yet')).toBeInTheDocument()
  })

  it('should render items', () => {
    render(
      <Column
        id="todo"
        title="To Do"
        items={[mockItem]}
        onDelete={vi.fn()}
        onDragStart={vi.fn()}
      />
    )

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Rick')).toBeInTheDocument()
  })

  it('should render green title for Done column', () => {
    render(
      <Column
        id="done"
        title="Done"
        items={[]}
        onDelete={vi.fn()}
        onDragStart={vi.fn()}
      />
    )

    const title = screen.getByText('Done')
    expect(title).toHaveClass('text-green-700')
  })

  it('should render gray title for non-Done columns', () => {
    render(
      <Column
        id="todo"
        title="To Do"
        items={[]}
        onDelete={vi.fn()}
        onDragStart={vi.fn()}
      />
    )

    const title = screen.getByText('To Do')
    expect(title).toHaveClass('text-gray-700')
  })
})
