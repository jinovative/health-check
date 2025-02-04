FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx tsc
CMD ["node", "dist/main.js", "config/endpoints.yaml"]