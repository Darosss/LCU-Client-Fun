# Path to the PowerShell executable
$powershellPath = (Get-Command powershell).Source

# Command to run the frontend project in a new PowerShell window
$frontendCommand = "cd ./backend; npm start"
Start-Process -FilePath $powershellPath -ArgumentList "-NoExit", "-Command", $frontendCommand

# Command to run the backend project in a new PowerShell window
$backendCommand = "cd ./frontend; npm start"
Start-Process -FilePath $powershellPath -ArgumentList "-NoExit", "-Command", $backendCommand

Start-Sleep -Seconds 5

# Start-Process $frontendUrl - allow to run default browser without path
# Make sure you uncomment line under and comment rest after
# Start-Process $frontendUrl

$frontendUrl = "http://localhost:3000";

# Path to Microsoft Edge executable (adjust this path if Edge is installed elsewhere)
# Here is edge - you can adjust for your own browser path
$browserPath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"


Start-Process -FilePath $browserPath -ArgumentList $frontendUrl


