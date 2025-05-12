FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

# Install AWS CLI dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    groff \
    less \
    && pip3 install --no-cache-dir awscli

# Copy AWS configuration directory and ensure it exists
RUN mkdir -p /root/.aws

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 