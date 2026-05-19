import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

class MockDragEvent extends Event {
  dataTransfer = {
    setData: vi.fn(),
    getData: vi.fn(),
    clearData: vi.fn(),
    effectAllowed: '',
    dropEffect: '',
  }
}

globalThis.DragEvent = MockDragEvent as unknown as typeof DragEvent