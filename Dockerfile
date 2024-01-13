FROM node:18-alpine as builder

WORKDIR /app

COPY package.json yarn.lock elastic-apm-node.js ./

RUN yarn install --frozen-lockfile \ 
    && yarn cache clean

COPY . .
RUN yarn build

FROM node:18-alpine as runner
WORKDIR /app
COPY --from=builder /app/elastic-apm-node.js .
COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 5000
ENV PORT 5000

CMD ["node", "server.js"]