FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm install --prefer-offline --no-audit --no-fund && \
    npm cache clean --force

COPY . .

RUN npm run build

FROM nginx:alpine AS runner

RUN apk add --no-cache tini

COPY --from=builder /app/dist/sanara-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -f /docker-entrypoint.d/20-envsubst-on-templates.sh && \
    adduser -D -H -u 1000 -s /bin/nologin appuser && \
    chown -R appuser:appuser /usr/share/nginx/html && \
    sed -i 's/user  nginx;/user appuser;/' /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["nginx", "-g", "daemon off;"]