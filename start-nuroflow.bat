@echo off
title NuroFlow Launcher
color 0D

echo ======================================================
echo  NuroFlow Launcher - Starting Your Neural Experience
echo ======================================================
echo.

REM Проверяем, существует ли уже NodeJS в папке
if exist "%~dp0NodeJS\node.exe" (
    echo NodeJS already installed in %~dp0NodeJS
    echo Skipping download and installation...
    echo.
) else (
    echo NodeJS not found. Installing...
    echo.
    
    REM Запускаем батник установки NodeJS с параметром silent
    call "%~dp0install-portable-node.bat" silent
    
    REM Проверяем успешность установки
    if not exist "%~dp0NodeJS\node.exe" (
        color 0C
        echo ERROR: NodeJS installation failed!
        echo Please check error messages above or try to run install-portable-node.bat manually.
        echo.
        pause
        exit /b 1
    )
    
    echo NodeJS installed successfully!
    echo.
)

REM Добавляем NodeJS в PATH для текущей сессии - простая версия
set PATH=%~dp0NodeJS;%PATH%

REM Проверяем только node.exe (базовая версия)
echo Checking Node.js...
"%~dp0NodeJS\node.exe" -v

echo.
echo Starting NuroFlow application...
echo ======================================================
echo.

REM Запускаем основной батник проекта
call "%~dp0run-neuroflow.bat"

echo.
echo ======================================================
echo NuroFlow session ended.
echo Thank you for using NuroFlow!
echo ======================================================
pause 