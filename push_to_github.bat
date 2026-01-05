@echo off
echo Initializing Git repository...
git init

echo Adding files...
git add .

echo Committing files...
git commit -m "Ready for deployment: PostgreSQL configured"

echo Renaming branch to main...
git branch -M main

echo Adding remote origin...
git remote add origin https://github.com/mohamad1991277-spec/mohamadmatter.git
git remote set-url origin https://github.com/mohamad1991277-spec/mohamadmatter.git

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause
