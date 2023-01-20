# Project Starter Template

## Installation

### Prerequisites
- A MySQL database
- NodeJS
- Yarn

1. `git clone` the project.
2. `cd <directory>`
3. `yarn`
4. `yarn mikro-orm migration:create --initial` (When removing the `example.entity`, you should probably remove the migration and cache file this creates and create a new initial migration)
5. `yarn mikro-orm migration:up`
6. Copy `environment.example.ts` to `environment.ts` in `/apps/api/src/environments` and `/apps/web-app/src/environments`. Edit the API environment and fill in the database credentials.
7. Update the following files to match your project name:

   - `/apps/web-app/.eslintrc.js`: `@angular-eslint/directive-selector` and `@angular-eslint/component-selector` prefixes (current = ps, for project-starter)
   - `/apps/web-app/src/index.html`: Change `<title>` attribute
   - `/nx.json`: Change `"npmScope"` attribute
   - `/package.json`: Change `"name"` attribute

8. `yarn start web-app` and `yarn start api` in seperate terminal windows
9. Go to `http://localhost:4200`.