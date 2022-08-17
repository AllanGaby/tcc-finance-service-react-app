FROM node:16-alpine as builder
ARG API_HOST
ENV API_URL=${API_HOST}
ENV ACCESS_TOKEN_NAME=Authorization
ENV ACCESS_TOKEN_KEY=@finance-service:token
WORKDIR /opt/tcc-finance-service-react-app
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./public_key.pem ./public_key.pem
COPY ./public ./public
RUN echo $API_HOST
RUN export API_URL=$API_HOST
RUN echo $API_URL
RUN npm i
RUN npm run start