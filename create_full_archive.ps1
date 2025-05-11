# Script to create a complete portable archive for NuroFlow including ALL components

# --- Configuration ---
$ProjectRoot = (Get-Location).Path
$ArchiveName = "NuroFlow_Complete_Archive.zip"
$TempDirName = "temp_complete_archive"

$ErrorActionPreference = "Stop" # Stop on any error

Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "  NuroFlow - Creating Complete Archive Package" -ForegroundColor Cyan
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Project Root: $ProjectRoot"
Write-Host "Archive Name: $ArchiveName"
Write-Host "Temporary Directory: $TempDirName"
Write-Host ""

# Construct full paths
$FullArchivePath = Join-Path $ProjectRoot $ArchiveName
$FullTempDirPath = Join-Path $ProjectRoot $TempDirName

# 1. Clean up previous archive and temp directory if they exist
if (Test-Path $FullArchivePath) {
    Write-Host "[CLEANUP] Removing existing archive: $FullArchivePath" -ForegroundColor Yellow
    Remove-Item $FullArchivePath -Force
}
if (Test-Path $FullTempDirPath) {
    Write-Host "[CLEANUP] Removing existing temporary directory: $FullTempDirPath" -ForegroundColor Yellow
    Remove-Item $FullTempDirPath -Recurse -Force
}

# 2. Create a new temporary directory
Write-Host "[SETUP] Creating temporary directory: $FullTempDirPath" -ForegroundColor Green
New-Item -ItemType Directory -Path $FullTempDirPath | Out-Null

# 3. Copy ALL project files and folders to the temporary directory
Write-Host "[COPY] Starting file copy process..." -ForegroundColor Green

# Define exclusion list
$exclusions = @(
    $TempDirName,                   # Exclude the temp dir itself
    $ArchiveName,                   # Exclude the archive we're creating
    "*.zip",                        # Exclude any other zip files
    ".git",                         # Exclude git repository
    ".vscode",                      # Exclude VS Code settings
    "temp_nuroflow_repo",           # Exclude any temp repo
    "temp_nuroflow_archive"         # Exclude any other temp archive folders
)

# Get items to copy (everything except exclusions)
Write-Host "[COPY] Identifying files and folders to copy (excluding temporary and system files)..." -ForegroundColor Green
$itemsToCopy = Get-ChildItem -Path $ProjectRoot -Force | Where-Object {
    $item = $_
    $exclude = $false
    foreach ($pattern in $exclusions) {
        if ($item.Name -like $pattern) {
            $exclude = $true
            break
        }
    }
    -not $exclude
}

# Copy files with progress reporting
$totalItems = $itemsToCopy.Count
$currentItem = 0

foreach ($item in $itemsToCopy) {
    $currentItem++
    $percentComplete = [int](($currentItem / $totalItems) * 100)
    
    $destinationPath = Join-Path $FullTempDirPath $item.Name
    Write-Progress -Activity "Copying Files" -Status "Processing $($item.Name)" -PercentComplete $percentComplete
    
    if ($item.PSIsContainer) {
        Write-Host "  [COPY] Copying directory: $($item.Name)" -ForegroundColor Green
        Copy-Item -Path $item.FullName -Destination $destinationPath -Recurse -Force
    } else {
        Write-Host "  [COPY] Copying file: $($item.Name)" -ForegroundColor Green
        Copy-Item -Path $item.FullName -Destination $destinationPath -Force
    }
}

Write-Progress -Activity "Copying Files" -Completed
Write-Host "[COPY] All files copied successfully." -ForegroundColor Green

# Ensure essential files are included
$essentialFiles = @(
    "run-neuroflow.bat",
    "start-nuroflow.bat",
    "install-portable-node.bat"
)

foreach ($file in $essentialFiles) {
    $sourcePath = Join-Path $ProjectRoot $file
    $destPath = Join-Path $FullTempDirPath $file
    
    if (Test-Path $sourcePath) {
        if (-not (Test-Path $destPath)) {
            Write-Host "[ENSURE] Copying essential file: $file..." -ForegroundColor Green
            Copy-Item -Path $sourcePath -Destination $destPath -Force
        }
    } else {
        Write-Host "[WARNING] Essential file not found: $file" -ForegroundColor Yellow
    }
}

# 4. Check if temp directory has content
$TempDirContents = Get-ChildItem -Path $FullTempDirPath
if ($TempDirContents.Count -eq 0) {
    Write-Host "[ERROR] Temporary directory $FullTempDirPath is empty before compression. Check copy steps." -ForegroundColor Red
    exit 1
} else {
    Write-Host "[VERIFY] Temporary directory contains $(($TempDirContents | Where-Object { -not $_.PSIsContainer }).Count) files and $(($TempDirContents | Where-Object { $_.PSIsContainer }).Count) directories." -ForegroundColor Green
    
    # List important directories/files for verification
    Write-Host ""
    Write-Host "[VERIFY] Key components in the archive:" -ForegroundColor Green
    $keysToCheck = @("node_modules", "src", "public", "NodeJS", "run-neuroflow.bat", "start-nuroflow.bat", "install-portable-node.bat")
    foreach ($key in $keysToCheck) {
        $keyPath = Join-Path $FullTempDirPath $key
        if (Test-Path $keyPath) {
            if ((Get-Item $keyPath) -is [System.IO.DirectoryInfo]) {
                $itemCount = (Get-ChildItem $keyPath -Recurse -File).Count
                Write-Host "  [✓] $key ('Directory' with $itemCount files)" -ForegroundColor Green
            } else {
                Write-Host "  [✓] $key ('File')" -ForegroundColor Green
            }
        } else {
            Write-Host "  [✗] $key (Missing)" -ForegroundColor Yellow
        }
    }
    Write-Host ""
}

# 5. Create the ZIP archive
Write-Host "[ARCHIVE] Creating ZIP archive: $FullArchivePath" -ForegroundColor Green
Write-Host "[ARCHIVE] This may take several minutes for large projects..." -ForegroundColor Yellow

# List directory contents for debugging
Write-Host "[DEBUG] Contents of temp directory to be archived:" -ForegroundColor Magenta
Get-ChildItem -Path $FullTempDirPath -Force | ForEach-Object {
    if ($_.PSIsContainer) {
        Write-Host "  DIR: $($_.Name)" -ForegroundColor Magenta
    } else {
        Write-Host "  FILE: $($_.Name)" -ForegroundColor Magenta
    }
}

try {
    Write-Host "[ARCHIVE] Using Compress-Archive to create ZIP..." -ForegroundColor Yellow
    Compress-Archive -Path "$FullTempDirPath\*" -DestinationPath $FullArchivePath -Force
    
    # Verify archive creation
    if (Test-Path $FullArchivePath) {
        $archiveSize = (Get-Item $FullArchivePath).Length
        $archiveSizeMB = [math]::Round($archiveSize / 1MB, 2)
        Write-Host "[SUCCESS] Archive created successfully! Size: $archiveSizeMB MB" -ForegroundColor Cyan
    } else {
        Write-Host "[ERROR] Archive file not found after compression attempt!" -ForegroundColor Red
        Write-Host "Temporary directory $FullTempDirPath will NOT be deleted for inspection." -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "[ERROR] Error creating archive: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "[ERROR] Full Error Record: $_" -ForegroundColor Red
    Write-Host "[INFO] Temporary directory $FullTempDirPath will NOT be deleted for inspection." -ForegroundColor Yellow
    exit 1
}

# 6. Clean up the temporary directory
Write-Host "[CLEANUP] Removing temporary directory: $FullTempDirPath" -ForegroundColor Green
Remove-Item $FullTempDirPath -Recurse -Force

Write-Host ""
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "  NuroFlow Complete Archive Creation Finished!" -ForegroundColor Cyan
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Archive created at: $FullArchivePath"
Write-Host ""
Write-Host "You can now distribute this archive to others. Recipients should:"
Write-Host "1. Extract the archive"
Write-Host "2. Run start-nuroflow.bat to automatically setup and launch the application"
Write-Host "" 