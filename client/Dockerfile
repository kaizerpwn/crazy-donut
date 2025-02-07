FROM node:20-alpine as build

WORKDIR /app
#
RUN apk add --no-cache curl bash

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:${PATH}"

COPY package*.json ./

RUN bun install

COPY . .

RUN bun run build

FROM nginx:alpine as production

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]