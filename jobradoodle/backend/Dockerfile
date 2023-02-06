FROM node:19-alpine3.15

ENV NODE_OPTIONS=--max_old_space_size=2048
ENV BACKEND_PORT 3005

WORKDIR /backend

COPY ./package.json ./package-lock.json /backend/
COPY ./tsconfig.json /backend/

RUN mkdir -p /backend/src
COPY ./src /backend/src                       

RUN npm install 

EXPOSE $BACKEND_PORT

CMD ["npm", "start"]
