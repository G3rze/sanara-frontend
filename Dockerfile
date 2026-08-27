FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/sanara-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -f /docker-entrypoint.d/20-envsubst-on-templates.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
