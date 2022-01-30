FROM node:current-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json /app/

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start"]