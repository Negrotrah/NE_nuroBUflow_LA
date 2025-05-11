@echo off
setlocal

REM === Settings ===
set NODE_VERSION=20.11.1
set NODE_DIST=node-v%NODE_VERSION%-win-x64
set NODE_URL=https://nodejs.org/dist/v%NODE_VERSION%/%NODE_DIST%.zip
set NODE_DIR=%CD%\NodeJS

REM === Download Node.js ===
echo Downloading Node.js %NODE_VERSION%...
powershell -Command "Invoke-WebRequest -Uri '%NODE_URL%' -OutFile 'nodejs.zip'"

REM === Extract Node.js ===
echo Extracting Node.js...
powershell -Command "Expand-Archive -Path 'nodejs.zip' -DestinationPath '.' -Force"
if exist "%NODE_DIR%" rmdir /s /q "%NODE_DIR%"
move "%NODE_DIST%" "%NODE_DIR%"
del nodejs.zip

REM === Add to PATH for current session ===
set PATH=%NODE_DIR%;%NODE_DIR%\node_modules\npm\bin;%PATH%
echo Node.js added to PATH for this session.

REM === Check installation ===
"%NODE_DIR%\node.exe" -v
"%NODE_DIR%\npm.cmd" -v

echo Node.js is ready to use!

REM Проверяем, запущен ли скрипт в "тихом" режиме (silent)
if "%1"=="silent" (
    echo Running in silent mode - no cmd prompt will be left open.
    exit /b 0
) else (
    echo You can now run your main project batch file (type 'run-neuroflow.bat' and press Enter).
    cmd /k
) 