FROM node:10

WORKDIR /usr/local/src/emoto

COPY package*.json ./

#RUN npm install
# If you are building your code for production
RUN npm i --only=production

# Bundle app source
COPY . .

RUN export NODE_ENV=production
RUN node_modules/.bin/sequelize db:migrate
RUN node_modules/.bin/sequelize db:seed:all

EXPOSE 3000
CMD [ "npm", "start" ]