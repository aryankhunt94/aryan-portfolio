@echo off
echo Installing googleapis...
cd c:\antigravity\portfolio
call npm install googleapis
echo.
echo Installation complete. Now running backend...
call run_backend.bat
pause
