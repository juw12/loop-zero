# Notion CRM Schema: Lead Tracker

## Database Properties

| Property | Type | Options / Notes |
|----------|------|-----------------|
| Name | Title | Lead's full name |
| Company | Text | Business name |
| Niche | Select | Real Estate / Clinic / Restaurant / E-commerce / Other |
| Stage | Select | Lead / Replied / Call Scheduled / Proposal / Won / Lost |
| First Contact Date | Date | When you first reached out |
| Last Contact | Date | Most recent touch (email, call, DM, meeting) |
| Notes | Text | Context, pain points, decisions made |
| Deal Size Est. | Select | $500 / $2,000 / $500 per month / TBD |
| Next Action | Text | What you will do next and when |

## Seed Example Rows

| Name | Company | Niche | Stage | First Contact | Last Contact | Notes | Deal Size Est. | Next Action |
|------|---------|-------|-------|---------------|--------------|-------|----------------|-------------|
| Somchai P. | Chulalongkorn Realty | Real Estate | Replied | 2026-10-28 | 2026-10-30 | Copies 30+ LINE leads into Excel daily. Wants a bot. | $500 | Call Mon 10am to scope LINE to Sheets automation |
| Dr. Nara T. | Bright Smile Dental | Clinic | Lead | 2026-10-29 | 2026-10-29 | Sent cold email about appointment reminder bot. No reply yet. | TBD | Follow up in 3 days if no response |
| Kanya W. | Bangkok Ramen Co. | Restaurant | Call Scheduled | 2026-10-27 | 2026-10-30 | 25-min call done. Wants DM order-taking plus daily sales summary. Budget confirmed. | $2,000 | Send proposal by Fri |
| Arif H. | GadgetsTH (Shopee) | E-commerce | Proposal | 2026-10-25 | 2026-10-29 | Sent Workflow System proposal (order sync, review follow-up, weekly report). Waiting on decision. | $2,000 | Check in Thu if no reply by Wed |
| Ploy S. | (none) | Other | Lost | 2026-10-20 | 2026-10-23 | No budget this quarter. Asked to reconnect in January. | TBD | Add to Jan outreach list |

## Usage Note

Update "Last Contact" and "Next Action" every time you touch a lead, even if it's just a "no reply" note. Treat "Next Action" as your to-do list: filter by Stage = "Call Scheduled" or "Proposal," sort by date, and work top to bottom. Review the full board once a week, 10 minutes, Friday afternoon. If a lead sits in "Lead" for 7+ days with no reply, mark it "Lost" and move on. Don't let ghosts clog the pipeline.
