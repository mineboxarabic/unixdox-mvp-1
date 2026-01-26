#!/bin/bash

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to start..."
sleep 5

# Check if replica set is already initialized
RS_STATUS=$(mongosh --quiet --eval "try { rs.status().ok } catch(e) { 0 }")

if [ "$RS_STATUS" != "1" ]; then
  echo "Initializing replica set..."
  mongosh --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})"
  echo "Replica set initialized!"
else
  echo "Replica set already initialized, skipping..."
fi
