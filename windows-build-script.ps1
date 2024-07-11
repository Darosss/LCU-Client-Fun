# Path to the PowerShell executable
$powershellPath = (Get-Command powershell).Source

# Command to run build the frontend project build
$frontendCommand = "cd ./frontend; npm run build; exit"
Start-Process -FilePath $powershellPath -ArgumentList "-NoExit", "-Command", $frontendCommand -Wait

# Command to run build the backend project build
$backendCommand = "cd ./backend; npm run build; exit"
Start-Process -FilePath $powershellPath -ArgumentList "-NoExit", "-Command", $backendCommand -Wait

Write-Output "Build completed"