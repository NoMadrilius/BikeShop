# Getting Started

### Prerequisites

```sh
# Install pnpm
npx pnpm add -g pnpm
```

```sh
# Install NX
npm install -g nx
```

### Development

1. Add `env.local` to `./packages/client/.env.local` (see example `./packages/client/.env.example`)

```sh
cp .env.example ./packages/client/.env.local
```

2. Install dependencies

```sh
pnpm install
```

3. Run development server

```sh
pnpm run dev
```

# Used technologies

- [Nx](https://nx.dev)
- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Cypress](https://www.cypress.io)
- [ESLint](https://eslint.org/)
