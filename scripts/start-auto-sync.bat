@echo off
setlocal
title Portfolio GitHub Auto-Sync Daemon
cd /d "%~dp0\.."
echo ==========================================================
echo Starting Portfolio Real-Time GitHub Auto-Sync Daemon...
echo ==========================================================
echo.
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0auto-sync.ps1"
echo.
pause
