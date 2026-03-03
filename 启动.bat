@echo off
chcp 65001 >nul
title 金融学习平台
echo ========================================
echo    金融学习平台 - 启动中...
echo ========================================
echo.
echo 正在启动服务器...
echo.
echo 请在浏览器打开: http://localhost:3000
echo.
echo 启动成功后不要关闭此窗口
echo 按 Ctrl+C 可停止服务器
echo ========================================

cd /d "%~dp0"

start http://localhost:3000

npm run dev

pause
