FROM node:19-alpine3.15

# ENV NODE_OPTIONS=--max_old_space_size=2048
ENV FRONTEND_PORT 3000

WORKDIR /frontend

COPY ./package.json ./package-lock.json /frontend/
COPY ./tsconfig.json /frontend/

RUN mkdir -p /frontend/src
COPY ./src /frontend/src

RUN mkdir -p /frontend/public
COPY ./public /frontend/public

RUN npm install 
RUN npm run build

EXPOSE $FRONTEND_PORT

CMD ["npm", "start"]
