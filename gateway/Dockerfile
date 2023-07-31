FROM node:18-alpine
RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
ADD . /var/www/gateway
RUN yarn install
RUN yarn run build
CMD ["yarn", "start"]