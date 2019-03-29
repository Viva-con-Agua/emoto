FROM node:10

WORKDIR /usr/local/src/emoto

COPY package*.json ./

#RUN npm install
# If you are building your code for production
RUN npm i --only=production

# Bundle app source
COPY . .

#Add Seeders?
#Add Migrations
CMD ["export", "NODE_ENV=production"]
EXPOSE 3000
CMD [ "npm", "start" ]