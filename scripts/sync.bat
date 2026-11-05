@echo off
setlocal
title Portfolio One-Click GitHub Sync
cd /d "%~dp0\.."
echo [Portfolio Sync] Synchronizing changes directly to GitHub...
echo.
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0sync.ps1"
echo.
echo Press any key to close this window...
pause >nul
