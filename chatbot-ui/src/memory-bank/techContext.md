# Technical Context: Vue 3 Chatbot UI

## Technology Stack

### Core Technologies
- **Vue 3**: Frontend framework
  - Composition API for logic organization
  - TypeScript support
  - Component-based architecture

- **TypeScript**: Programming language
  - Type safety
  - Better IDE support
  - Enhanced code maintainability

- **Tailwind CSS**: Styling framework
  - Utility-first approach
  - Responsive design
  - Custom design system

### Development Environment

#### Build Tools
- **Vite**: Build and development tool
  - Fast hot module replacement
  - Optimized production builds
  - Plugin ecosystem

#### Code Quality Tools
- **ESLint**: Code linting
  - TypeScript support
  - Vue 3 specific rules
  - Automatic fixing capabilities

- **Prettier**: Code formatting
  - Consistent code style
  - Integrated with ESLint
  - Auto-formatting on save

### Dependencies

#### Production Dependencies
```json
{
  "vue": "^3.5.13",    // Core framework
  "axios": "^1.10.0",  // HTTP client
  "marked": "^15.0.12" // Markdown processing
}
```

#### Development Dependencies
```json
{
  "@vitejs/plugin-vue": "^5.2.3",
  "@vue/tsconfig": "^0.7.0",
  "typescript": "~5.8.3",
  "tailwindcss": "^4.1.10",
  "postcss": "^8.5.6",
  "autoprefixer": "^10.4.21"
}
```

## Development Setup

### Environment Requirements
- Node.js (LTS version recommended)
- npm or yarn package manager
- Modern web browser

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint and fix files
npm run lint

# Format code
npm run format
```

## Configuration Files

### Vue Configuration
- `vite.config.ts`: Vite and Vue plugin configuration
- `tsconfig.json`: TypeScript configuration
- `tsconfig.app.json`: Application-specific TS config

### Code Quality
- `.eslintrc.cjs`: ESLint rules and plugins
- `.prettierrc.cjs`: Code formatting rules

### Styling
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.cjs`: PostCSS plugins setup

## Build & Deploy Configuration
- Development server: `localhost:5173` (Vite default)
- Production build: Static files in `dist/`
- Asset handling: Public directory for static assets

## API Integration
- Endpoint: `http://localhost:5678/webhook/chatbot`
- Method: POST
- Request format: JSON
- Response handling: Axios interceptors

## Performance Optimizations
- Vite's dev server for fast HMR
- Production build optimization
- Code splitting
- Asset optimization
