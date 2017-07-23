FROM node:latest

RUN mkdir /app

ADD package.json /app/package.json

RUN cd /app && npm install --production

ENV NODE_ENV production

ADD . /app
WORKDIR /app

CMD ["node", "index.js", 2000]
