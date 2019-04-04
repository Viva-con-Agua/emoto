FROM node:10

WORKDIR /usr/local/src/emoto

COPY package*.json ./

#RUN npm install
# If you are building your code for production
RUN npm i --only=production
RUN mkdir log
# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]