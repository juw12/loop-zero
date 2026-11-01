#!/usr/bin/env pwsh
<#
.SYNOPSIS
  One-command launch — does everything that doesn't need human credentials.

.DESCRIPTION
  Run this after:
    1. GitHub repo is created (https://github.com/new, then `git remote add origin ...`)
    2. Vercel account exists (https://vercel.com/signup)
    3. You have created a Vercel token (https://vercel.com/account/tokens)
    4. You have set GITHUB_TOKEN, VERCEL_TOKEN, LLM_API_KEY in your shell or .env

  What it does:
    - Verifies prerequisites
    - Pushes code to GitHub (uses GITHUB_TOKEN env var, non-interactive)
    - Logs into Vercel via token (non-interactive)
    - Deploys all 5 apps as separate Vercel projects
    - Prints deployment URLs at the end

  Requires env vars: GITHUB_TOKEN, VERCEL_TOKEN, VERCEL_SCOPE, LLM_API_KEY
  Optional (for saas): STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_*

.EXAMPLE
  $env:GITHUB_TOKEN = "ghp_xxxx"
  $env:VERCEL_TOKEN = "your_vercel_token"
  $env:LLM_API_KEY = "sk-xxxx"
  .\scripts\launch.ps1
#>

param(
  [string]$RepoName = "loop-zero",
  [string]$GitHubUser = "",
  [switch]$SkipGit = $false
)

$ErrorActionPreference = "Stop"

# Load .env.production if it exists
if (Test-Path ".env.production") {
  Write-Host "Loading .env.production..."
  Get-Content ".env.production" | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
      $name = $matches[1].Trim()
      $val = $matches[2].Trim()
      if (-not [string]::IsNullOrWhiteSpace($val)) {
        Set-Item -Path "Env:$name" -Value $val
      }
    }
  }
}

# ── prerequisites ────────────────────────────────────────────────
Write-Host ""
Write-Host "=== Checking prerequisites ==="

$missing = @()

if (-not $env:VERCEL_TOKEN) { $missing += "VERCEL_TOKEN (https://vercel.com/account/tokens)" }
if (-not $env:LLM_API_KEY) { $missing += "LLM_API_KEY (OpenAI or Anthropic)" }

if (-not $SkipGit) {
  if (-not $env:GITHUB_TOKEN) {
    $missing += "GITHUB_TOKEN (https://github.com/settings/tokens — needs 'repo' scope)"
  }
  if (-not $env:GH_USER -and -not $GitHubUser) {
    Write-Host "  GH_USER not set — will try to detect from git config..."
    $gitUser = (& git config user.name 2>$null)
    if ($gitUser) {
      Write-Host "  Detected git user: $gitUser"
    } else {
      $missing += "GH_USER (your GitHub username)"
    }
  }
}

if ($missing.Count -gt 0) {
  Write-Host ""
  Write-Host "Missing env vars:" -ForegroundColor Yellow
  $missing | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
  Write-Host ""
  Write-Host "Set them in your shell or .env.production, then re-run." -ForegroundColor Yellow
  Write-Host "Or run with -SkipGit to deploy only (skip GitHub push)." -ForegroundColor Yellow
  exit 1
}

# ── step 1: push to github ────────────────────────────────────────
if (-not $SkipGit) {
  Write-Host ""
  Write-Host "=== Pushing to GitHub ==="
  $user = if ($GitHubUser) { $GitHubUser } else { $env:GH_USER }
  $repoUrl = "https://${env:GITHUB_TOKEN}@github.com/$user/$RepoName.git"

  # Check if remote exists
  $hasRemote = (& git remote get-url origin 2>$null)
  if (-not $hasRemote) {
    Write-Host "  Adding remote origin..."
    & git remote add origin $repoUrl
  } else {
    Write-Host "  Remote origin already set: $hasRemote"
  }

  # Check if repo exists on GitHub (HEAD request via API)
  Write-Host "  Checking if repo exists..."
  $headers = @{ Authorization = "token $($env:GITHUB_TOKEN)" }
  try {
    $check = Invoke-WebRequest -Uri "https://api.github.com/repos/$user/$RepoName" -Headers $headers -UseBasicParsing -TimeoutSec 10
    if ($check.StatusCode -eq 200) {
      Write-Host "  Repo exists — pushing commits..."
    }
  } catch {
    Write-Host "  Repo doesn't exist — creating..."
    $body = @{ name = $RepoName; private = $false; auto_init = $false } | ConvertTo-Json
    try {
      Invoke-WebRequest -Uri "https://api.github.com/user/repos" -Headers $headers -Method POST -Body $body -ContentType "application/json" -UseBasicParsing | Out-Null
      Write-Host "  Repo created: https://github.com/$user/$RepoName"
    } catch {
      Write-Host "  Failed to create repo. Create it manually at https://github.com/new" -ForegroundColor Red
      Write-Host "  Repo name: $RepoName" -ForegroundColor Yellow
      exit 1
    }
  }

  Write-Host "  Pushing main branch..."
  & git push -u origin main 2>&1 | Select-Object -Last 5
  Write-Host "  Pushed." -ForegroundColor Green
}

# ── step 2: deploy to vercel ──────────────────────────────────────
Write-Host ""
Write-Host "=== Deploying 5 apps to Vercel ==="

$deploys = @(
  @{ Name = "portfolio";       Path = "portfolio" }
  @{ Name = "saas";            Path = "saas" }
  @{ Name = "review-responder";Path = "demos\review-responder" }
  @{ Name = "listing-writer";  Path = "demos\listing-writer" }
  @{ Name = "fake-door";       Path = "templates\fake-door" }
)

$results = @()
foreach ($d in $deploys) {
  Write-Host ""
  Write-Host "--- $($d.Name) ---"
  Push-Location $d.Path

  $envArgs = @(
    "--prod", "--yes",
    "--token", $env:VERCEL_TOKEN
  )
  if ($env:VERCEL_SCOPE) { $envArgs += @("--scope", $env:VERCEL_SCOPE) }

  # Pass secrets to vercel CLI via --build-env or just rely on Vercel project settings
  # For first deploy, set via --build-env
  if ($env:LLM_API_KEY -and $d.Name -in @("review-responder", "listing-writer")) {
    $envArgs += @("--build-env", "LLM_PROVIDER=$($env:LLM_PROVIDER)")
    $envArgs += @("--build-env", "LLM_API_KEY=$env:LLM_API_KEY")
  }
  if ($d.Name -eq "saas" -and $env:STRIPE_SECRET_KEY) {
    $envArgs += @("--build-env", "STRIPE_SECRET_KEY=$env:STRIPE_SECRET_KEY")
    $envArgs += @("--build-env", "STRIPE_WEBHOOK_SECRET=$env:STRIPE_WEBHOOK_SECRET")
    foreach ($p in @("PROFESSIONAL_MONTHLY","PROFESSIONAL_ANNUAL","TEAM_MONTHLY","TEAM_ANNUAL")) {
      $val = [Environment]::GetEnvironmentVariable("STRIPE_PRICE_$p")
      if ($val) { $envArgs += @("--build-env", "STRIPE_PRICE_$p=$val") }
    }
    if ($env:NEXT_PUBLIC_SITE_URL) { $envArgs += @("--build-env", "NEXT_PUBLIC_SITE_URL=$env:NEXT_PUBLIC_SITE_URL") }
  }

  try {
    $output = & vercel @envArgs 2>&1
    $url = ($output | Select-String -Pattern 'https://[\w\-\.]+\.vercel\.app' | Select-Object -First 1).Matches.Value
    $results += [pscustomobject]@{ App = $d.Name; Url = $url; Status = "deployed" }
    if ($url) { Write-Host "  $url" -ForegroundColor Green }
  } catch {
    $results += [pscustomobject]@{ App = $d.Name; Url = ""; Status = "FAILED: $($_.Exception.Message)" }
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
  }
  Pop-Location
}

Write-Host ""
Write-Host "════════════════════════════════════════════════════════"
Write-Host "  Deployment complete"
Write-Host "════════════════════════════════════════════════════════"
$results | Format-Table -AutoSize

Write-Host ""
Write-Host "Next steps (each takes ~2 minutes):"
Write-Host "  1. Add a custom domain in Vercel (buy one at namecheap.com for ~$12/yr)"
Write-Host "  2. Update Calendly URLs in portfolio/components/{Nav,Hero,Footer}.tsx"
Write-Host "  3. Set up Stripe webhook (https://dashboard.stripe.com/webhooks) pointing to <saas-url>/api/webhook"
Write-Host "  4. Send your first 20 outreach messages using docs/outreach.md"
Write-Host ""
Write-Host "Detailed setup: see saas/README.md for Stripe, and agency-starter/README.md for the 14-day launch checklist."
