FROM node:alpine

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 5000