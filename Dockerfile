# use the offical Bun image

From oven/bun:latest

WORKDIR /app


#build web frontend
WORKDIR /app/web
COPY web/package.json web/bun.lock* ./
RUN bun install --frozen-lockfile
COPY web/ ./
RUN bun build


#install backend dependencies
WORKDIR /app/backend
COPY backend/package.json backend/bun.lock* ./
RUN bun install --frozen-lockfile
COPY backend/ ./
RUN bun build


#expose the port
EXPOSE 3000
#set non-sensitive defaults
ENV PORT=3000
ENV NODE_ENV=production


#start the application
CMD ["bun", "run", "start:prod"]