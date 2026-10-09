@echo off
echo ========================================================
echo   DAKSHITA MATHUR - GITHUB PAGES DEPLOYMENT HELPER
echo ========================================================
echo.
echo Step 1: Make sure you created a repository on GitHub (e.g. 'portfolio' or 'dakshita1010.github.io')
echo.
set /p REPO_NAME="Enter your GitHub repository name (default: portfolio): "
if "%REPO_NAME%"=="" set REPO_NAME=portfolio

echo.
echo Setting remote to https://github.com/dakshita1010/%REPO_NAME%.git ...
git remote remove origin 2>nul
git remote add origin https://github.com/dakshita1010/%REPO_NAME%.git
git branch -M main

echo.
echo Pushing code to GitHub...
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo [SUCCESS] Code pushed successfully!
    echo.
    echo If your repo is named 'dakshita1010.github.io', your site will be live at:
    echo https://dakshita1010.github.io
    echo.
    echo If your repo is named '%REPO_NAME%', go to:
    echo https://github.com/dakshita1010/%REPO_NAME%/settings/pages
    echo Under 'Branch', select 'main', click 'Save'.
    echo Your site will be live at:
    echo https://dakshita1010.github.io/%REPO_NAME%/
) else (
    echo [NOTE] Push failed. Make sure you created the repo on https://github.com/new first and are logged in.
)

pause
