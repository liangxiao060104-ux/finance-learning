@echo off
echo ========================================
echo    金融学习平台 - 启动中...
echo ========================================
echo.
echo 请在浏览器打开: http://localhost:3000
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================

cd /d "%~dp0"

npm run dev

pause
