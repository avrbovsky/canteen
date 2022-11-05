FROM node:alpine
WORKDIR '/app'

COPY . .
RUN npm ci
RUN npm run build
ENV NODE_ENV production
EXPOSE 10027
CMD [ "npx", "serve", "build" ]