@echo off
echo ===================================================
echo FORCING UPDATE TO GITHUB
echo ===================================================
echo.
echo This will ensure your latest changes (including the Calendar project)
echo are sent to GitHub, which will trigger Vercel to update.
echo.

cd c:\antigravity\portfolio

echo 1. Adding files...
call git add .

echo 2. Committing...
call git commit -m "Force update: Add Calendar Project"

echo 3. Pushing to GitHub...
call git push origin main

echo.
echo ===================================================
echo DONE!
echo Now check your Vercel Dashboard. You should see a new build.
echo ===================================================
pause
