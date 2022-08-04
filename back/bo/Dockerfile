FROM node:16.13.0
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
# EXPOSE 8008
CMD ["npm", "run", "start"]
