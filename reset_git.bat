@echo off
echo ===================================================
echo FIXING GIT REPOSITORY
echo ===================================================
echo.
echo We need to reset the repository to remove the 'credentials.json' file
echo from the history, otherwise GitHub will keep blocking the push.
echo.

:: 1. Remove the old git history (this deletes the .git folder)
if exist .git (
    attrib -h .git
    rmdir /s /q .git
)

:: 2. Initialize a fresh repository
echo Initializing new git repo...
call git init
call git branch -M main

:: 3. Add files (This time, .gitignore will prevent secrets from being added)
echo Adding files...
call git add .

:: 4. Commit
echo Committing...
call git commit -m "Initial portfolio release"

:: 5. Add the remote URL (Found from your error message)
echo Adding remote...
call git remote add origin https://github.com/aryankhunt94/aryan-portfolio.git

:: 6. Push
echo Pushing to GitHub...
call git push -u origin main --force

echo.
echo ===================================================
echo DONE!
echo ===================================================
pause
