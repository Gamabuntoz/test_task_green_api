FROM node:18-alpine
RUN mkdir -p /var/www/user
WORKDIR /var/www/user
ADD . /var/www/user
RUN yarn install
RUN yarn run build
CMD ["yarn", "start"]
