FROM node:alpine

RUN apk add --no-cache bash
RUN apk add --no-cache netcat-openbsd

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

EXPOSE 3000

CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "start"]
