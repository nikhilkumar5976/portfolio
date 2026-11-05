<#
.SYNOPSIS
    One-click sync script for Nikhil Kumar's Portfolio.
    Automatically stages all changes, commits with an informative message, and pushes to GitHub.
#>
param (
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"
$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $RepoRoot

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Portfolio GitHub Sync Utility" -ForegroundColor Cyan
Write-Host " Repository : $RepoRoot" -ForegroundColor Gray
Write-Host " Remote     : https://github.com/nikhilkumar5976/portfolio" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

# Check for modified or untracked files
$status = git status --porcelain
if (-not $status) {
    Write-Host "[Sync] No changes detected. Repository is already up to date!" -ForegroundColor Green
    exit 0
}

Write-Host "[Sync] Staging all modified and new files..." -ForegroundColor Yellow
git add -A

if ([string]::IsNullOrWhiteSpace($Message)) {
    $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    $Message = "Update portfolio assets and content [$timestamp]"
}

Write-Host "[Sync] Committing with message: '$Message'..." -ForegroundColor Yellow
git commit -m $Message

Write-Host "[Sync] Pushing changes to origin main..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[Sync] SUCCESS: All changes successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "View at: https://github.com/nikhilkumar5976/portfolio" -ForegroundColor Cyan
} else {
    Write-Host "`n[Sync] ERROR: Push failed with exit code $LASTEXITCODE. Please check your network and credentials." -ForegroundColor Red
}
