FROM node:21-alpine3.19 AS build

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node package.json ./

RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .

RUN pnpm build

FROM nginx:alpine
WORKDIR /usr/src/app

ADD ./default.conf /etc/nginx/conf.d/default.conf    
COPY --from=build /usr/src/app/dist /var/www/app/

ARG VITE_API_URL
EXPOSE 80
ENV VITE_API_URL=$VITE_API_URL
CMD ["nginx", "-g", "daemon off;"]
