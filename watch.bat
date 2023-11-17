@echo off
cd %~dp0
sass --watch ./src/scss/custom.scss ./src/css/custom.min.css --style compressed