#!/bin/sh

echo "Stop and removing old docker containers"
docker-compose down
echo "Building docker containers"
docker-compose build
echo "Running docker containers"
docker-compose up -d blacklistcpfverifier-mongo
sleep 5s
docker-compose up -d blacklistcpfverifier-backend