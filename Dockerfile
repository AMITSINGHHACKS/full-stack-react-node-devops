FROM node:13-alpine
WORKDIR ./app
COPY ./ ./
RUN npm install --no-audit
EXPOSE 3000
CMD ["npm", "start"]
