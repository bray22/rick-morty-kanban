# Rick & Morty Kanban Board

A frontend-only Kanban board application that fetches characters from the Rick and Morty GraphQL API and lets you organize tasks across three columns: To Do, Doing, and Done.

## Features

- **Drag and Drop**: Move items between columns using native HTML5 drag-and-drop
- **Character Integration**: Each task is assigned a Rick and Morty character
- **Confetti Animation**: Celebrate completed tasks with confetti animation
- **Real-time Character Fetching**: Fetches characters from the Rick and Morty GraphQL API
- **Clean UI**: Built with React, TypeScript, and Tailwind CSS

## Tech Stack

- **React 19** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **react-confetti** - Confetti animation
- **Rick and Morty GraphQL API** - Character data

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd kanban-board
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Create Tasks**: Fill in the form at the top with a task title and select a character
2. **Drag Items**: Click and drag items between columns
3. **Complete Tasks**: Drag items to the "Done" column to trigger confetti animation
4. **Delete Tasks**: Click the delete button on any task card

## Project Structure

```
src/
 components/
 Card.tsx              # Individual task card component   
 Column.tsx            # Column container component   
 CreateItemForm.tsx    # Form for creating new tasks   
 services/
 rickAndMortyAPI.ts   # GraphQL API calls   
 App.tsx                   # Main app component with drag-drop logic
 types.ts                  # TypeScript type definitions
 main.tsx                  # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Notes

- The app stores state in memory only (no persistence)
- Characters are fetched on app load from the public Rick and Morty API
- Uses HTML5 native drag-and-drop (not a library like react-beautiful-dnd)
