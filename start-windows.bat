@echo off
chcp 65001 >nul
cd /d "%~dp0"
set PORT=8000
where node >nul 2>nul
if %errorlevel% equ 0 (
  node tools\serve.mjs %PORT%
) else (
  start "" "http://localhost:%PORT%/"
  python -m http.server %PORT% --bind 127.0.0.1
)
