FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn --frozen-lockfile
COPY ./ ./
COPY ./apps/web-app/src/environments/environment.prod.ts ./apps/web-app/src/environments/environment.ts
RUN yarn build web-app --configuration production

FROM nginx:1.23.3-alpine-slim
COPY --from=build /usr/src/app/dist/apps/web-app /usr/share/nginx/html
COPY --from=build /usr/src/app/apps/web-app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080