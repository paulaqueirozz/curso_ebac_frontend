@echo off
setlocal enabledelayedexpansion
chcp 65001
if %~2 == W (
echo @echo off > %~3\kindlepreviewer.bat
echo for /f "tokens=2 delims=:." %%%%x in ^('chcp'^) do set cp^=%%%%x >> %~3\kindlepreviewer.bat
echo mode con cp select^=65001^>nul >> %~3\kindlepreviewer.bat
echo "%~1\Kindle Previewer 3" %%* >> %~3\kindlepreviewer.bat
echo set cp^=%%cp: ^=%% ^>nul >> %~3\kindlepreviewer.bat
echo mode con cp select^=%%cp%%^>nul >> %~3\kindlepreviewer.bat
copy /y %~3\kindlepreviewer.bat %~3\kpr.bat
)

for /F "skip=2 tokens=1,2*" %%A in ('reg query HKCU\Environment /v Path') do (
set pathvar=%%C
if %~2== W (
set newvar="!pathvar!;%~3"
if "!pathvar:%~3=!"=="!pathvar!" (
reg add "HKCU\Environment" /v "Path" /t REG_EXPAND_SZ /d !newvar! /f
)
) else (
set newvar="!pathvar:;%~3=!"
reg add "HKCU\Environment" /v "Path" /t REG_EXPAND_SZ /d !newvar! /f
)
)
