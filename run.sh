#!/bin/bash

# Function to run the backend
run_backend() {
  echo "Running backend..."
  cd Backend
  dotnet run &
  BACKEND_PID=$!
  cd ..
}

# Function to run the frontend
run_frontend() {
  echo "Running frontend..."
  cd Frontend
  ng serve &
  FRONTEND_PID=$!
  cd ..
}

# Function to run both
run_both() {
  echo "Running both backend and frontend..."
  run_backend
  run_frontend
}

# Function to stop the backend
stop_backend() {
  echo "Stopping backend..."
  if [[ -n "$BACKEND_PID" ]]; then
    kill $BACKEND_PID
    echo "Backend stopped."
  else
    echo "Backend PID not found."
  fi
}

# Function to stop the frontend
stop_frontend() {
  echo "Stopping frontend..."
  if [[ -n "$FRONTEND_PID" ]]; then
    kill $FRONTEND_PID
    echo "Frontend stopped."
  else
    echo "Frontend PID not found."
  fi
}

# Function to stop both
stop_both() {
  echo "Stopping both backend and frontend..."
  stop_backend
  stop_frontend
}

# Trap SIGINT and SIGTERM to ensure both processes are terminated
trap stop_both SIGINT SIGTERM

# Check the argument passed to the script
if [ "$1" == "backend" ]; then
  run_backend
  wait $BACKEND_PID
elif [ "$1" == "frontend" ]; then
  run_frontend
  wait $FRONTEND_PID
elif [ "$1" == "both" ]; then
  run_both
  wait $BACKEND_PID $FRONTEND_PID
elif [ "$1" == "stop-backend" ]; then
  stop_backend
elif [ "$1" == "stop-frontend" ]; then
  stop_frontend
elif [ "$1" == "stop" ]; then
  stop_both
else
  echo "Usage: $0 {backend|frontend|both|stop-backend|stop-frontend|stop}"
fi
