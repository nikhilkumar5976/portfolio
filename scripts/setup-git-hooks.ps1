<#
.SYNOPSIS
    Configures Git to use automated hooks from .githooks directory.
#>
$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $RepoRoot

Write-Host "Configuring Git hooks path to .githooks..." -ForegroundColor Cyan
git config core.hooksPath .githooks

# Also copy into .git/hooks for redundancy
$gitHooksDir = Join-Path $RepoRoot ".git\hooks"
if (Test-Path $gitHooksDir) {
    Copy-Item (Join-Path $RepoRoot ".githooks\post-commit") (Join-Path $gitHooksDir "post-commit") -Force
}

Write-Host "Git hooks successfully configured! Every local commit will now auto-push to GitHub." -ForegroundColor Green
