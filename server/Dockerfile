FROM node:10

WORKDIR /usr/local/src/emoto

COPY package*.json ./

#RUN npm install
# If you are building your code for production
RUN npm i --only=production

# Bundle app source
COPY . .

CMD ["export", "NODE_ENV=production"]
CMD ["node_modules/.bin/sequelize", "db:migrate"]
CMD ["node_modules/.bin/sequelize", "db:seed:all"]
EXPOSE 3000
CMD [ "npm", "start" ]