FROM node:boron
RUN mkdir /app 
WORKDIR /app 
ADD . /app/
RUN npm install
