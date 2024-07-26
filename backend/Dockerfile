FROM node:alpine

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000