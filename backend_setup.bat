@REM @echo off
@REM echo Installing backend dependencies...
@REM call npm install express sqlite3 cors nodemon googleapis
@REM if %errorlevel% neq 0 (
@REM     echo Error installing dependencies.
@REM     pause
@REM     exit /b %errorlevel%
@REM )

@REM echo Starting Backend Server...
@REM call npx nodemon server/index.js
@REM pause



@echo off
REM -----------------------------
REM start-backend-mongo.bat
REM Installs dependencies for a MongoDB backend and starts the server
REM -----------------------------

echo Installing backend dependencies...
call npm install express mongoose cors nodemon googleapis dotenv
if %errorlevel% neq 0 (
    echo.
    echo Error installing dependencies.
    echo Make sure you have Node.js and npm installed and you are connected to the internet.
    pause
    exit /b %errorlevel%
)

echo.
echo Installing complete.
echo.

REM Ensure MONGODB_URI is set (optional helpful message)
if "%MONGODB_URI%"=="" (
    echo WARNING: MONGODB_URI environment variable is not set.
    echo You can set it now or put it into a .env file (recommended) in the project root.
    echo Example .env content:
    echo MONGODB_URI=mongodb://127.0.0.1:27017/your-db-name
    echo.
)

echo Starting Backend Server with nodemon...
REM Change the path below if your entry file is at a different location (e.g., server/index.js)
call npx nodemon server/index.js
if %errorlevel% neq 0 (
    echo.
    echo The server exited with an error.
    pause
    exit /b %errorlevel%
)

pause
