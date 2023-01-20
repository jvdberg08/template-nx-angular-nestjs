# Project Starter Template

## Included in this template

- API (NestJS v9, MikroORM v5.5)
- Web App (Angular v14, Akita v7)
- JWT email + password authentication
- E2E testing skeleton
- ESLint + Prettier
  - Prettier configured as ESLint rule
  - Ran on every commit (not yet in CI/CD)

## Installation

### Prerequisites

- A MySQL database
- NodeJS (nvm is recommended)
- Yarn

### Setup

1. `git clone` the project.
2. `cd <directory>`
3. Copy `environment.example.ts` to `environment.ts` in `/apps/api/src/environments` and `/apps/web-app/src/environments`. Edit the API environment and fill in the database credentials.
4. `yarn`
5. `yarn mikro-orm migration:create --initial` (When removing the `example.entity`, you should probably remove the migration and cache file this creates and create a new initial migration)
6. `yarn mikro-orm migration:up`
7. Update the following files to match your project name:

   - `/apps/web-app/.eslintrc.js`: `@angular-eslint/directive-selector` and `@angular-eslint/component-selector` prefixes (current = ps, for project-starter)
   - `/apps/web-app/src/index.html`: Change `<title>` attribute
   - `/nx.json`: Change `"npmScope"` attribute
   - `/package.json`: Change `"name"` attribute

8. `yarn start web-app` and `yarn start api` in seperate terminal windows
9. Go to `http://localhost:4200`.

## Getting started

### General

- Run e2e tests: `yarn e2e`
- Run eslint (lint project): `yarn lint`
- Run prettier (format project): `yarn format`

### Angular
- Generating Angular component: `yarn nx g @nrwl/angular:component --project web-app`
- Generating Angular pipe: `yarn nx g @nrwl/angular:pipe --project web-app`
- Generating Angular directive: `yarn nx g @nrwl/angular:directive --project web-app`
- Generating Angular interceptor: `yarn nx g @nrwl/angular:interceptor --project web-app`
- Generating Angular guard: `yarn nx g @nrwl/angular:guard --project web-app`

### Akita
- Generate Akita feature: `yarn nx g @datorama/akita:feature --project web-app <FEATURE_NAME> --path apps/web-app/src/app/core --flat false --entityService Http`
  - NOTE: The generated `x.model.ts` is not correct. The state interface definition should be included in `x.store.ts`, and `x.model.ts` should contain the entity definition. See existing features.

### NestJS
- Generate NestJS resource: `yarn nx g @nrwl/nest:resource`

### MikroORM
- Create migration: `yarn mikro-orm migration:create`
- Apply migrations: `yarn mikro-orm migration:up`
- Revert migrations: `yarn mikro-orm migration:down`
- Revert & apply all migrations: `yarn mikro-orm migration:fresh`
- Run seeder: `yarn mikro-orm seeder:run [-c <SEEDER_NAME>]`
- Create seeder: `yarn mikro-orm seeder:create <SEEDER_NAME>`
- Create database (if it does not exist): `yarn mikro-orm database:create`

### NX

- Generate NX library: `yarn nx g library`