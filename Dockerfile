# builder
FROM node:14.15.4-alpine as builder
WORKDIR /usr/src/app

COPY package* ./
RUN npm install

COPY . .

RUN npm run build

# final docker image
FROM node:14.15.4-alpine
WORKDIR /usr/src/app

COPY package* ./
RUN npm install

COPY --from=builder /usr/src/app/build ./

EXPOSE 3000

CMD node index.js

