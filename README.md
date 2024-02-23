# PNPM monorepo
## System Requirements
- Node ^20
- pnpm ^8

## Before Start
Go to `packages/backend` and create `.env` file (reference to `.env.example` file

## Editor
If you are using VSCode (strongly recommend), you need to install the following extensions:
1. [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. [biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)


## Dev Setup
### Using `pnpm` to install packages
  ```sh
  pnpm install
  ```

### Start Backend
  ```sh
  pnpm run dev:be
  ```
  or
  ```sh
  pnpm run be
  ```

### Start Frontend
  ```sh
  pnpm run dev:fe
  ```
  or
  ```sh
  pnpm run fe
  ```
