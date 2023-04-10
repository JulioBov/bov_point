FROM public.ecr.aws/bitnami/node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

EXPOSE 5000

ENV NODE_ENV=production
RUN npm run swagger
CMD ["npm", "run", "server"]