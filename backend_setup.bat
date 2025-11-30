@echo off
echo Installing backend dependencies...
call npm install express sqlite3 cors nodemon googleapis
if %errorlevel% neq 0 (
    echo Error installing dependencies.
    pause
    exit /b %errorlevel%
)

echo Starting Backend Server...
call npx nodemon server/index.js
pause
