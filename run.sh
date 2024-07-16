#!/bin/bash

# Function to run the backend
run_backend() {
  echo "Running backend..."
  cd Backend
  dotnet run
}

# Function to run the frontend
run_frontend() {
  echo "Running frontend..."
  cd Frontend
  ng serve
}

# Function to run both
run_both() {
  echo "Running both backend and frontend..."
  (cd Backend && dotnet run) &
  (cd Frontend && ng serve)
}

# Check the argument passed to the script
if [ "$1" == "backend" ]; then
  run_backend
elif [ "$1" == "frontend" ]; then
  run_frontend
elif [ "$1" == "both" ]; then
  run_both
else
  echo "Usage: $0 {backend|frontend|both}"
fi
