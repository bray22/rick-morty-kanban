import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Column } from '../Column'
import type { KanbanItem } from '../../types'

const mockItems: KanbanItem[] = [
  {
    id: '1',
    title: 'Test Task',
    characterId: 'char1',
    character: {
      id: 'char1',
      name: 'Rick',
      image: 'https://example.com/rick.jpg',
    },
  },
]

describe('Column Component', () => {
  it('should render empty state when no items', () => {
    render(
      <Column
        id="todo"
        title="To Do"
        items={[]}
        onDelete={vi.fn()}
        onDragStart={vi.fn()}
        onDropOnCard={vi.fn()}
      />
    )

    expect(screen.getByText('Drag a card here or create a new task')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should render items', () => {
    render(
      <Column
        id="todo"
        title="To Do"
        items={mockItems}
        onDelete={vi.fn()}
        onDragStart={vi.fn()}
        onDropOnCard={vi.fn()}
      />
    )

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Rick')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should render Done column title and icon', () => {
    render(
      <Column
        id="done"
        title="Done"
        items={[]}
        onDelete={vi.fn()}
        onDragStart={vi.fn()}
        onDropOnCard={vi.fn()}
      />
    )

    expect(screen.getByText('Done')).toBeInTheDocument()
    expect(screen.getByLabelText('Done column icon')).toBeInTheDocument()
  })

  it('should render To Do column title and icon', () => {
    render(
      <Column
        id="todo"
        title="To Do"
        items={[]}
        onDelete={vi.fn()}
        onDragStart={vi.fn()}
        onDropOnCard={vi.fn()}
      />
    )

    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByLabelText('To Do column icon')).toBeInTheDocument()
  })
})