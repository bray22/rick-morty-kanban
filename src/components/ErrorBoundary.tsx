// components/ErrorBoundary.tsx
import { Component } from 'react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '1rem' }}>
          Something went wrong.
        </div>
      )
    }

    return this.props.children
  }
}