FROM node:22-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN npm run build

WORKDIR /app/dist/apps/users

CMD ["node", "main"]
