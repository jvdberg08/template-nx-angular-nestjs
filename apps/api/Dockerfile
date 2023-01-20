FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn --frozen-lockfile
COPY ./ ./
COPY ./apps/api/src/environments/environment.prod.ts ./apps/api/src/environments/environment.ts
RUN yarn build api --configuration production
RUN cp ./dist/apps/api/package.json ./package.json
RUN yarn --pure-lockfile

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
ENTRYPOINT ["node", "./dist/apps/api/main.js"]