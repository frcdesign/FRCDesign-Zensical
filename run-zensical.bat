@echo off

setlocal

set "ROOT=%~dp0"

pushd "%ROOT%"

set "PY=%ROOT%.venv\Scripts\python.exe"

"%PY%" -m zensical serve %*

set "EXITCODE=%ERRORLEVEL%"

popd
exit /b %EXITCODE%

pause