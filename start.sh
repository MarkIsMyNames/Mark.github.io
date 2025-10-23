#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Website...${NC}\n"

# Function to cleanup background processes on exit
cleanup() {
    echo -e "\n${RED}Shutting down services...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Start Backend
echo -e "${GREEN}Starting Backend (Flask)...${NC}"
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install dependencies
source venv/bin/activate
pip install -q -r requirements.txt

# Start Flask server
python app.py &
BACKEND_PID=$!
echo -e "${GREEN}Backend started (PID: $BACKEND_PID) on http://localhost:5000${NC}\n"

cd ..

# Start Frontend
echo -e "${GREEN}Starting Frontend (React)...${NC}"
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Start React server
npm start &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started (PID: $FRONTEND_PID) on http://localhost:3000${NC}\n"

echo -e "${BLUE}Both services are running!${NC}"
echo -e "${RED}Press Ctrl+C to stop all services\n${NC}"

# Wait for frontend to be ready and open browsers
echo -e "${BLUE}Waiting for frontend to be ready...${NC}"
sleep 5

# Open browser (works on Linux, macOS, and Windows WSL)
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
elif command -v open &> /dev/null; then
    open http://localhost:3000
elif command -v start &> /dev/null; then
    start http://localhost:3000
fi

echo -e "${GREEN}Browser opened!${NC}\n"

# Wait for both processes
wait
