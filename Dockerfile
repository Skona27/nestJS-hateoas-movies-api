FROM node:latest
COPY . .
RUN yarn
CMD yarn start