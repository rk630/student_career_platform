FROM node:20
WORKDIR /
COPY . /
RUN npm install --force
ENV PORT $PORT
ENV BACKEND_URL $BACKEND_URL
EXPOSE 80
CMD ["npm","run","start"]
