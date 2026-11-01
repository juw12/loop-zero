#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Deploy all 4 agency-starter apps to Vercel.

.DESCRIPTION
  Two modes:
    1. Vercel CLI mode  — if `vercel` is on PATH and you're logged in, deploys each app.
    2. Git mode        — otherwise prints the push commands to wire up auto-deploy
                         via Vercel's GitHub/GitLab integration.

.PARAMETER Prod
  Promote to production (otherwise deploys as preview).

.PARAMETER Only
  Deploy only the named app(s). Comma-separated. Default: all four.
  Options: portfolio, review-responder, listing-writer, fake-door

.EXAMPLE
  .\scripts\deploy-all.ps1
  .\scripts\deploy-all.ps1 -Prod
  .\scripts\deploy-all.ps1 -Only portfolio,listing-writer
#>

param(
  [switch]$Prod,
  [string]$Only = ""
)

$ErrorActionPreference = "Stop"

# Portable Node.js (for the vercel CLI if not globally installed)
$nodeBin = "~\.config\opencode\skills\portable-nodejs\bin\node-v24.14.1-win-x64"
if (Test-Path $nodeBin) { $env:PATH = "$nodeBin;$env:PATH" }

$apps = @(
  @{ Name = "portfolio";       Path = "portfolio" }
  @{ Name = "saas";            Path = "saas" }
  @{ Name = "review-responder";Path = "demos\review-responder" }
  @{ Name = "listing-writer";  Path = "demos\listing-writer" }
  @{ Name = "fake-door";       Path = "templates\fake-door" }
)

if ($Only) {
  $wanted = $Only -split "," | ForEach-Object { $_.Trim() }
  $apps = $apps | Where-Object { $wanted -contains $_.Name }
  if ($apps.Count -eq 0) {
    Write-Error "No matching apps. Available: portfolio, saas, review-responder, listing-writer, fake-door"
    exit 1
  }
}

$modeFlag = if ($Prod) { "--prod" } else { $null }

# Detect vercel CLI
$vercel = Get-Command vercel -ErrorAction SilentlyContinue
$vercelReady = $false
if ($vercel) {
  Write-Host "Found vercel CLI: $($vercel.Source)"
  try {
    $whoami = & vercel whoami 2>&1
    if ($whoami -match "(\S+@\S+|\S+\s*<") {
      $vercelReady = $true
      Write-Host "Logged in as: $($whoami.Trim())"
    }
  } catch { }
}

if (-not $vercelReady) {
  Write-Host ""
  Write-Host "==============================================================="
  Write-Host "  Vercel CLI not detected / not logged in."
  Write-Host "  Recommended: connect the repo to Vercel once, get auto-deploys."
  Write-Host "==============================================================="
  Write-Host ""
  Write-Host "Steps:"
  Write-Host "  1. Push this repo to GitHub (one-time):"
  Write-Host "       git init && git add . && git commit -m 'Initial kit'"
  Write-Host "       gh repo create agency-starter --public --source=. --push"
  Write-Host "  2. In https://vercel.com/new, import the repo."
  Write-Host "  3. Vercel will detect 5 Next.js apps under:"
  Write-Host "       - portfolio/"
  Write-Host "       - saas/"
  Write-Host "       - demos/review-responder/"
  Write-Host "       - demos/listing-writer/"
  Write-Host "       - templates/fake-door/"
  Write-Host "     Create one Vercel project per app. Add LLM_API_KEY in each project's"
  Write-Host "     Settings > Environment Variables. The saas app also needs STRIPE_SECRET_KEY"
  Write-Host "     and STRIPE_WEBHOOK_SECRET — see saas/README.md for setup."
  Write-Host ""
  exit 0
}

# Deploy each app
$results = @()
foreach ($app in $apps) {
  Write-Host ""
  Write-Host "=== Deploying $($app.Name) ==="
  Push-Location $app.Path
  try {
    $args = @("deploy")
    if ($Prod) { $args += "--prod" }
    $args += "--yes"
    $output = & vercel @args 2>&1
    $url = ($output | Select-String -Pattern 'https://[\w\-\.]+\.vercel\.app' | Select-Object -First 1).Matches.Value
    $results += [pscustomobject]@{ App = $app.Name; Url = $url; Status = "deployed" }
    Write-Host $output
  } catch {
    $results += [pscustomobject]@{ App = $app.Name; Url = ""; Status = "FAILED: $($_.Exception.Message)" }
  }
  Pop-Location
}

Write-Host ""
Write-Host "==============================================================="
Write-Host "  Deployment summary"
Write-Host "==============================================================="
$results | Format-Table -AutoSize
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Copy each URL into portfolio/components/Demos.tsx (the /demo/* links)."
Write-Host "  2. Update portfolio/components/Nav.tsx + Hero.tsx + Footer.tsx Calendly link."
Write-Host "  3. Add your domain in Vercel project settings."
Write-Host "  4. Run day 5-7 of the launch checklist (agency-starter/README.md)."
