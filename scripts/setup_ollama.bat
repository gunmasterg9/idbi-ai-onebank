@echo off
echo ========================================================
echo   IDBI AI OneBank - Local PC AI Setup (Ollama)
echo ========================================================
echo.
echo Installing Ollama on Windows via winget...
winget install Ollama.Ollama --accept-source-agreements --accept-package-agreements

echo.
echo ========================================================
echo Ollama installation complete!
echo Next steps:
echo 1. Open a new terminal window
echo 2. Run your preferred model, e.g.:
echo    ollama run llama3.2
echo 3. The IDBI AI OneBank backend will automatically connect to it!
echo ========================================================
pause
