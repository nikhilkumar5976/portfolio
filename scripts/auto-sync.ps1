<#
.SYNOPSIS
    Real-Time File Watcher & Automated GitHub Sync Daemon.
    Monitors the repository for asset additions, image updates, code edits, and prompt modifications.
    Debounces rapid writes and automatically executes git add, commit, and push.
#>
param (
    [int]$DebounceSeconds = 3,
    [string]$Branch = "main"
)

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $RepoRoot

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Portfolio Real-Time Auto-Sync Watcher Active" -ForegroundColor Cyan
Write-Host " Repository : $RepoRoot" -ForegroundColor Gray
Write-Host " Remote     : origin/$Branch (https://github.com/nikhilkumar5976/portfolio)" -ForegroundColor Gray
Write-Host " Debounce   : $DebounceSeconds seconds" -ForegroundColor Gray
Write-Host " Status     : Watching for asset, image, and code changes..." -ForegroundColor Green
Write-Host " (Keep this window open or minimized to maintain auto-sync)" -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Cyan

# Configure FileSystemWatcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $RepoRoot
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Folders and files to exclude from triggering sync
$ignoredSubstrings = @('\.git', '\.vscode', '\.system_generated', 'node_modules')

$global:lastChangeTimestamp = [DateTime]::MinValue
$global:hasPendingChanges = $false

$changeHandler = {
    param($source, $eventArgs)
    $fullPath = $eventArgs.FullPath

    foreach ($ignored in $using:ignoredSubstrings) {
        if ($fullPath -match [regex]::Escape($ignored)) {
            return
        }
    }

    $fileName = $eventArgs.Name
    $changeType = $eventArgs.ChangeType
    $currentTime = Get-Date

    Write-Host "[Change Detected] $changeType: $fileName at $($currentTime.ToString('HH:mm:ss'))" -ForegroundColor Yellow
    $global:lastChangeTimestamp = $currentTime
    $global:hasPendingChanges = $true
}

# Register file events
$handlers = @(
    (Register-ObjectEvent -InputObject $watcher -EventName "Changed" -Action $changeHandler),
    (Register-ObjectEvent -InputObject $watcher -EventName "Created" -Action $changeHandler),
    (Register-ObjectEvent -InputObject $watcher -EventName "Deleted" -Action $changeHandler),
    (Register-ObjectEvent -InputObject $watcher -EventName "Renamed" -Action $changeHandler)
)

try {
    while ($true) {
        Start-Sleep -Milliseconds 500

        if ($global:hasPendingChanges) {
            $secondsSinceLastChange = ((Get-Date) - $global:lastChangeTimestamp).TotalSeconds

            if ($secondsSinceLastChange -ge $DebounceSeconds) {
                $global:hasPendingChanges = $false
                Write-Host "`n[Auto-Sync] Debounce period elapsed. Checking git status..." -ForegroundColor Cyan

                $status = git status --porcelain
                if ($status) {
                    Write-Host "[Auto-Sync] Modified files detected. Staging changes..." -ForegroundColor Yellow
                    git add -A

                    $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
                    $commitMsg = "Auto-sync: update assets and portfolio files [$timestamp]"
                    
                    Write-Host "[Auto-Sync] Committing: '$commitMsg'..." -ForegroundColor Yellow
                    git commit -m $commitMsg

                    Write-Host "[Auto-Sync] Pushing to origin $Branch directly..." -ForegroundColor Yellow
                    git push origin $Branch

                    if ($LASTEXITCODE -eq 0) {
                        Write-Host "[Auto-Sync] SUCCESS: Changes automatically pushed to GitHub!" -ForegroundColor Green
                    } else {
                        Write-Host "[Auto-Sync] WARNING: Git push returned error code $LASTEXITCODE." -ForegroundColor Red
                    }
                } else {
                    Write-Host "[Auto-Sync] No working tree changes to commit." -ForegroundColor DarkGray
                }

                Write-Host "[Auto-Sync] Resuming watch mode...`n" -ForegroundColor Green
            }
        }
    }
}
finally {
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    foreach ($h in $handlers) {
        Unregister-Event -SourceIdentifier $h.Name -ErrorAction SilentlyContinue
    }
    Write-Host "[Auto-Sync] Watcher terminated." -ForegroundColor Gray
}
