# Niche Validation Playbook

Step-by-step instructions for testing which of the 5 niches in `niche-shortlist.md` has real demand before building a SaaS product for it.

> **TL;DR:** Spend 14 days and ~฿0. Run a 5-question discovery call with 10 prospects in each top niche. Use the fake-door landing page to gauge cold-traffic signal. Kill any niche that doesn't clear the thresholds below by day 14.

---

## The 14-day validation loop

```
Day 1–2    Identify 10–15 prospects per niche (top 3 only)
Day 3–7    Run 5 discovery calls per niche (async-friendly, 15 min each)
Day 7      Clone fake-door template, swap copy for the leading niche
Day 8–11   Share the fake-door link in 2–3 niche-specific groups/channels
Day 12–13  Read the data (signups, DMs, call notes)
Day 14     Decide: build / iterate / kill
```

You run all 3 top niches (real estate, dental, restaurants) in parallel. Total time: ~5 focused hours over 14 days.

---

## Step 1 — Find 10 prospects per niche (Day 1–2)

Use these specific channels. Numbers in parens are approximate group sizes or follower counts; verify before relying on them.

### Bangkok real estate agents

| Channel | Search query / action | Expected hit rate |
|---|---|---|
| Facebook group "Bangkok Real Estate Agents" (~50k members) | Search posts from last 30 days; DM 10 active posters | 3–4 reply |
| LINE OA groups | Ask one agent to add you to 2 LINE groups | 5–6 reply |
| Instagram hashtag `#คอนโด` `#bangkokrealestate` | DM 10 active posters | 1–2 reply |
| LinkedIn search "real estate agent Bangkok" | Send 10 connection requests with note | 2–3 reply |

**Outreach message template:**

> Hi [name], I'm testing demand for an AI tool that drafts property listings in Thai and English. 15-min call this week to ask 5 questions about how you currently write listings? No pitch, just research.

### Bangkok dental / medical clinics

| Channel | Search query / action | Expected hit rate |
|---|---|---|
| Facebook group "Bangkok Dentists" / "Clinic Owners Thailand" | Search posts; DM owners | 2–3 reply |
| Google Maps "dental clinic Bangkok" (top 100, Sukhumvit/Phrom Phong) | Cold LINE message via LINE OA | 1–2 reply |
| Walk-in visits (Phrom Phong, Thonglor) | Hand business card, follow up same day via LINE | 3–4 reply |
| Dental Show Asia exhibitor list | DM 10 small clinics (skip chains) | 1–2 reply |

### Independent Bangkok restaurants

| Channel | Search query / action | Expected hit rate |
|---|---|---|
| Facebook group "Bangkok Restaurant Owners" / "F&B Thailand" | DM active posters | 3–4 reply |
| Wongnai merchant pages (top 200) | Cold LINE message | 1 reply |
| Instagram hashtag `#ร้านอาหารกรุงเทพ` | DM 10 active posters | 1 reply |
| Walk-ins in your own neighborhood | Talk to owner, get LINE | 3–5 reply |

**Don't burn more than 2 hours per niche on outreach.** If reply rate is <10%, the niche may be wrong — note it and move on.

---

## Step 2 — 5-question discovery call (15 min, Day 3–7)

Run on LINE voice or in person. Take notes verbatim — pain quotes are gold.

```
Q1. Walk me through the last [task in hypothesis] you did. How long did it take?
    [Goal: confirm the pain is real and frequent]

Q2. How do you currently handle it? Tools, people, manual steps?
    [Goal: understand the existing workflow]

Q3. What does that cost you — money, time, lost deals?
    [Goal: quantify pain in their language]

Q4. If a tool did this for you automatically, what would that be worth per month?
    [Goal: anchor price. Listen for any number. If they say "free", probe.]

Q5. Who else do you know with this same problem? (colleague, competitor)
    [Goal: estimate reachability via referrals]
```

### Signal-to-decision matrix

| What they said | What it means | Decision |
|---|---|---|
| "Every day" / "every week" + specific time > 30 min | Real pain | Continue |
| "Sometimes" / "rarely" | Latent pain, hard to monetize | Demote |
| Names a number (฿/$) when asked Q4 | Real WTP | Strong continue |
| "Free is best" or no answer to Q4 | Likely tire-kicker | Demote |
| 2+ referrals in Q5 | Reachable, warm intros possible | Strong continue |
| "Don't really talk to anyone" | Hard niche to reach | Demote |

---

## Step 3 — Fake-door landing page test (Day 7–11)

Use the template in `../templates/fake-door/`. Swap the copy in `content.ts` for the leading niche.

### What to test

| Variable | Variant A | Variant B |
|---|---|---|
| **Headline** | Outcome-led ("Get replies in 5 minutes, not 5 hours") | Feature-led ("AI assistant for Bangkok real estate agents") |
| **CTA** | "Get early access" | "Join the waitlist" |
| **Color** | Your brand accent | Niche-native (forest green for real estate) |

Run A and B in parallel using two deploys (or two URLs from the same template).

### Where to share

For Bangkok real estate agents (top pick):
- Post in "Bangkok Real Estate Agents" Facebook group with a short story: "Built a tool for agents, looking for 10 to test free."
- DM 20 agents who already replied to your discovery calls.
- One Reddit post on r/Thailand or r/Bangkok.

For dental clinics:
- Post in "Bangkok Dentists" Facebook group.
- DM clinic owners from your discovery calls.

### Quantitative signal thresholds (Day 12–13)

| Metric | Strong signal | Weak signal | Kill |
|---|---|---|---|
| Email signups / 100 unique visitors | > 10% | 3–10% | < 3% |
| DMs received | > 5 | 1–5 | 0 |
| Discovery call show rate | > 50% | 20–50% | < 20% |
| WTP confirmed in calls | > 3/5 prospects | 1–3/5 | 0/5 |
| Referrals offered | > 2 calls | 1 call | 0 |

---

## Step 4 — Decide and act (Day 14)

### Build (proceed to SaaS MVP)
Two of: signup rate >10%, 5+ DMs, 3+ WTP confirms, 2+ referrals.

**Action:** Promote that niche to your SaaS plan. Build a 4-week MVP. Budget ฿5,000–10,000 for the first month of paid ads to validate paid acquisition.

### Iterate (test again)
Signup rate 3–10% but calls showed real pain. You may have a copy or channel problem, not a niche problem.

**Action:** Re-run with a different headline, different channel, or tighter audience. Spend another 7 days. Re-evaluate.

### Kill (move to next niche)
Below-threshold numbers. Don't argue with the data.

**Action:** Archive everything you learned. Move to the next niche on the shortlist. Run the same playbook. After 2 niches fail, re-read `niche-shortlist.md` and pick a different starting point.

---

## What success looks like at Day 14

- You have 50+ email signups on the fake-door page for one niche.
- 3+ prospects said "I'd pay $X/mo" unprompted.
- 5+ referrals on hand.
- You can describe the customer's exact workflow in their words.

That's the niche. Build for it.

---

## Anti-patterns to avoid

1. **Don't pitch on the discovery call.** You're learning, not selling. Selling now poisons the data.
2. **Don't run calls with people who wouldn't buy.** If they say "I'm just curious", thank them and end the call. Curious ≠ customer.
3. **Don't read your own copy to yourself.** If you can't tell whether the headline works, the audience can't either. Test both A and B.
4. **Don't kill a niche on one bad day.** A 0% signup day on Tuesday is not the same as a 2% week. Wait for the 14-day window.
5. **Don't promote the niche on your own audience first.** That biases the data. Get signal from cold traffic first.

---

## Cost to run this playbook

- 5 hours of your time (mostly async outreach + calls)
- ฿0 in cash (everything runs on free tiers + existing tools)
- 1 domain (฿350/year) if you don't have one for the fake-door page — defer otherwise, use Vercel's free subdomain

This is the cheapest possible way to know whether a niche is worth 6 months of building.
