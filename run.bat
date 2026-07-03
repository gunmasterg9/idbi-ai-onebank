@echo off
title IDBI AI OneBank - Local Launcher
echo ============================================================
echo           Launching IDBI AI OneBank Platform
echo ============================================================
echo.

set "PATH=%PATH%;C:\Program Files\nodejs;D:\Python311"
cd /d "%~dp0"

if exist "D:\Python311\python.exe" (
    "D:\Python311\python.exe" -u run_local.py
) else (
    python -u run_local.py
)

pause
