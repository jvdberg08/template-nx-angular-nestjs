# Project Starter Template

## Included in this template

- API (NestJS v9, MikroORM v5.5)
- Web-App (Angular v14, Akita v7)
- JWT email + password authentication
- E2E testing skeleton
- Linting (ESLint, Prettier, Commitlint)
    - Prettier configured as ESLint rule
- Gitlab CI/CD
    - CI/CD for merge requests
        - Web-App E2E tests
        - ESLint, Prettier, Commitlint
        - May need configuration if you don't use `main` as default branch, see [CI/CD Setup](#cicd-setup)
    - CI/CD for deployments
        - Docker, Terraform and GCP
        - Disabled by default. See [CI/CD Setup](#cicd-setup)

## Installation

### Prerequisites

- A MySQL database
- NodeJS (nvm is recommended)
- Yarn

### Setup

1. `git clone` the project.
2. `cd <directory>`
3. Copy `environment.example.ts` to `environment.ts` in `apps/api/src/environments`
   and `apps/web-app/src/environments`. Edit the API environment and fill in the database credentials.
4. `yarn`
5. It's probably a good idea to remove all files in `apps/api/src/app/database/migrations`, and recreate
   these with `yarn mikro-orm migration:create --initial` once you have replaced/removed the example entity in
   `apps/api/src/app/clusters/example`, as you don't want this example entity to exist in your migration.
6. `yarn mikro-orm migration:up` (to apply the migration from the previous step)
7. Update the following files to match your project name:

    - `apps/web-app/.eslintrc.js`: `@angular-eslint/directive-selector`
      and `@angular-eslint/component-selector` prefixes (current = ps,
      for project-starter)
    - `apps/web-app/src/index.html`: Change `<title>` attribute
    - `nx.json`: Change `"npmScope"` attribute
    - `package.json`: Change `"name"` attribute

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

- Generate Akita
  feature: `yarn nx g @datorama/akita:feature --project web-app <FEATURE_NAME> --path apps/web-app/src/app/core --flat false --entityService Http`
    - NOTE: The generated `x.model.ts` is not correct. The state interface definition should be included
      in `x.store.ts`, and `x.model.ts` should contain the entity definition. See existing features.

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

## CI/CD Setup

CI/CD for merge requests is set up already, you don't have to do anything.
If you're using main as your target branch, that is. If not, you will have to update
this (`if: $CI_MERGE_REQUEST_TARGET_BRANCH_NAME == "main"`) in `.gitlab/lint/lint.yml`,
`.gitlab/prepare/install.yml` and `.gitlab/test/web-app.yml`.

Since you probably don't want to immediately start deploying, the deployment
pipelines have been disabled by default. When you want to start deploying, you can remove
the `when: never` tags in `.gitlab/build/api.yml`, `.gitlab/build/web-app.yml`,
`.gitlab/deploy/deploy.yml` and `.gitlab/release/release.yml`. If you use a different
name for the default branch than `main`, you should also update `if: $CI_COMMIT_BRANCH_NAME == "main"`.

When that is done, follow the following steps.

1. Create a Google Cloud Project
2. Create a Google Artifact Registry (after enabling the api).
3. Create a Google Service Account with the following permissions
   (the least permissive default roles are given, but it is recommended to
   create your own role with only these permissions):

    - Easy command to create this
      role: ``gcloud iam roles create <ROLE_ID, e.g. terraform.cicd> --project <PROJECT_ID> --title <TITLE, e.g. "Terraform CI/CD"> --stage GA --permissions=artifactregistry.repositories.uploadArtifacts,cloudsql.instances.create,cloudsql.instances.get,cloudsql.instances.update,cloudsql.users.create,cloudsql.users.delete,cloudsql.users.get,cloudsql.users.list,cloudsql.users.update,iam.serviceAccounts.actAs,iam.serviceAccounts.create,iam.serviceAccounts.delete,iam.serviceAccounts.get,iam.serviceAccounts.update,resourcemanager.projects.get,resourcemanager.projects.getIamPolicy,resourcemanager.projects.setIamPolicy,run.services.create,run.services.delete,run.services.get,run.services.getIamPolicy,run.services.setIamPolicy,run.services.update,secretmanager.secrets.create,secretmanager.secrets.delete,secretmanager.secrets.get,secretmanager.secrets.getIamPolicy,secretmanager.secrets.setIamPolicy,secretmanager.secrets.update,secretmanager.versions.access,secretmanager.versions.add,secretmanager.versions.destroy,secretmanager.versions.enable,secretmanager.versions.get,serviceusage.services.disable,serviceusage.services.enable,serviceusage.services.get,serviceusage.services.list``
    - `artifactregistry.repositories.uploadArtifacts`
    - `cloudsql.instances.create`
    - `cloudsql.instances.get`
    - `cloudsql.instances.update`
    - `cloudsql.users.create`
    - `cloudsql.users.delete`
    - `cloudsql.users.get`
    - `cloudsql.users.list`
    - `cloudsql.users.update`
    - `iam.serviceAccounts.actAs`
    - `iam.serviceAccounts.create`
    - `iam.serviceAccounts.delete`
    - `iam.serviceAccounts.get`
    - `iam.serviceAccounts.update`
    - `resourcemanager.projects.get`
    - `resourcemanager.projects.getIamPolicy`
    - `resourcemanager.projects.setIamPolicy`
    - `run.services.create`
    - `run.services.delete`
    - `run.services.get`
    - `run.services.getIamPolicy`
    - `run.services.setIamPolicy`
    - `run.services.update`
    - `secretmanager.secrets.create`
    - `secretmanager.secrets.delete`
    - `secretmanager.secrets.get`
    - `secretmanager.secrets.getIamPolicy`
    - `secretmanager.secrets.setIamPolicy`
    - `secretmanager.secrets.update`
    - `secretmanager.versions.access`
    - `secretmanager.versions.add`
    - `secretmanager.versions.destroy`
    - `secretmanager.versions.enable`
    - `secretmanager.versions.get`
    - `serviceusage.services.disable`
    - `serviceusage.services.enable`
    - `serviceusage.services.get`
    - `serviceusage.services.list`

4. Download the key and create a CI/CD variable `GOOGLE_SERVICE_ACCOUNT_KEY` for
   it (GitLab > Settings > CI/CD > Variables). Use type `File`.
5. Create a Project Access Token (GitLab > Settings > Access Tokens). This will be the access
   token used to commit `package.json` version increments. Give it a name (this will be the username
   of the bot), role `Maintainer`, and `write_repository` scope.
6. Create a CI/CD variable `SEMANTIC_RELEASE_ACCESS_TOKEN` with the access token.
7. Update the following files:
    - `.gitlab-ci.yml` - update `PROJECT_ARTIFACT_REGISTRY` with the registry created in step 2.
    - `.gitlab/release/release.yml` - update `GIT_REPOSITORY` to your git repository URL.
    - `apps/web-app/src/environments/environment.prod.ts` - update `apiUrl` to correct
      value. This url should be as follows: `https://api-<PROJECT_HASH>-ez.a.run.app`.
      The `PROJECT_HASH` can be obtained by creating a dummy Cloud Run service, as the hash
      will (generally) always stay the same. This is ofcourse temporary until you set up
      proper domains. [This](https://gist.github.com/atrauzzi/924a09acdc5234568726b8507f5c9071)
      script might be useful as well.
    - `terraform/backend/backend.example.conf` - copy this file to `backend.conf` and set
      `username` to your GitLab username and `password` to an access token. Access tokens
      can be created [here](https://gitlab.com/-/profile/personal_access_tokens). Then run
      `terraform init -backend-config backend/backend.conf` to initialize terraform with
      the Terraform state managed by GitLab. (NOTE: This step is only required for
      your local terraform setup, CI/CD will not use this)
    - `terraform/variables.tf` - update the default variables to the correct project id.
      Update the image defaults to point to the Google Artifact Registry created in step 2.
      Only the project id default is currently used. The image defaults are always overridden in CI/CD,
      but for local usage it is still nice to override them.