#!/bin/bash

echo "Running docker-compose"
docker-compose up -d --build

echo "Waiting for DB to initialize"
sleep 10

echo "Initiating DB"
docker exec mongo_container mongo --eval "rs.initiate();"

echo "Running tests"

# test result
if go test ./... -v
then
  echo "Test PASSED"
else
  echo "Test FAILED"
fi

# cleanup
# docker-compose -f docker-compose.test.yml down
