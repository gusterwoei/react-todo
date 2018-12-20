FROM node:8-alpine
WORKDIR /usr/local/react-todo
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "build" ]

# Run this docker for development. -v is necessary for mouting local files volume to the container for auto detecting changes
# docker run -p 3000:3000 -d -v <absolute_local_project_dir>:/usr/local/react-todo <image>