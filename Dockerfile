FROM node:14-slim as client-builder

WORKDIR /client 

COPY ./client/package.json ./client/package-lock.json ./ 

RUN npm install --only=production

COPY ./client .

RUN npm run build

FROM node:14-slim as server-builder

WORKDIR /server

COPY ./server/package.json ./server/package-lock.json ./

RUN npm install --only=production

COPY ./server .

# Remove redundant files and directories

RUN rm -r _tests_ pages 

RUN rm .eslintrc.js .example.env readme.md

RUN npm run build

FROM node:12

WORKDIR /client/build

COPY --from=client-builder ./client/build .

WORKDIR /server

COPY --from=server-builder ./server/package.json ./server/package-lock.json ./

COPY --from=server-builder ./server/node_modules ./node_modules

COPY --from=server-builder ./server .

EXPOSE 8080

CMD npm run ${SPINUP_SCRIPT}