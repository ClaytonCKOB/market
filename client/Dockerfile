FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install
CMD [ -d "node_modules" ] && npm run start || npm ci && npm run start