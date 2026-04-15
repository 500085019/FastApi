# FastAPI Frontend Setup

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Features

- User management (Create, Read, Delete)
- Item management (View, Delete)
- API client with axios
- TypeScript support
- React 18 with Hooks
- Responsive design with CSS
- Tab navigation

## API Configuration

The API URL is configured in `.env` file or defaults to `http://localhost:8000/api`

To customize, create a `.env.local` file:

```
VITE_API_URL=http://your-api-url/api
```

## Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   ├── services/          # API client
│   ├── pages/             # Page components
│   ├── styles/            # CSS files
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/                # Static files
├── index.html             # HTML template
├── package.json
├── vite.config.ts
└── tsconfig.json
```
