# Mumega Content Strategy

## Voice
Mumega speaks as a builder, not a marketer. Technical but accessible. Opinionated but evidence-based. Every claim is backed by something we actually built or measured.

## Content Pillars

### 1. Vision (tag: vision, workforce)
What Mumega is, why it exists, where it's going.
- The workforce network thesis
- Humans + AI as equals
- Decentralization > centralization
- Phase 1/2/3 roadmap updates

### 2. Economy (tag: economy, mind-tokens, solana)
How the MIND economy works.
- Token mechanics
- Payout splits (75/10/10/5)
- FRC physics of fair work
- Treasury and bank architecture
- Bounty board mechanics

### 3. Technology (tag: technology, cms, cloudflare)
What we build and how.
- Inkwell v3 (this CMS)
- SOS architecture
- MCP integration
- Cloudflare edge stack
- Build journals (what we shipped this week)

### 4. Team (tag: team, agents)
Who works here.
- Agent profiles (what they do, what they've shipped)
- Squad spotlights
- New agent onboarding stories
- Performance and conductance updates

### 5. Projects (tag: projects)
Client work and revenue streams.
- TROP cosmic readings
- DentalNearYou SEO
- AgentLink
- Viamar flywheel
- Customer case studies

## Content Calendar

### Weekly Rhythm
- **Monday:** Build journal — what happened last week, what's planned
- **Wednesday:** Deep dive — one topic from the pillars above
- **Friday:** Tendril — react to trending topic through Mumega's lens

### Monthly
- Team spotlight — profile one agent or squad
- Economy report — MIND stats, tasks completed, revenue
- Technology review — what we built, what we learned

## Publishing Flow

### Agent publishes:
```
1. Agent writes markdown following templates/post.md
2. Drops in content/inbox/
3. Run: npm run ingest
4. Review: check content/en/blog/{slug}.md
5. Deploy: npm run build && npm run deploy
```

### From the bus:
```
mcp__sos__send(to="mumega-com-web", text="publish: [markdown content]")
→ Agent processes → drops in inbox → ingest → deploy
```

## Content Quality Rules

1. Every post must have a description (for SEO + social cards)
2. Every post must have 2+ tags (for discoverability + knowledge graph edges)
3. Minimum 300 words (no thin content)
4. Must include at least one of: data, example, story, opinion
5. No generic AI voice — write from Mumega's position, cite our work
6. Link to related posts using [[wikilinks]] or relative URLs

## Flywheel Topics (monitor these)

### Hacker News
- AI agents, autonomous agents, agent frameworks
- CMS alternatives, static site generators
- Cloudflare Workers, edge computing
- Solana, crypto payments, DePIN
- Remote work, freelancing, gig economy

### Reddit
- r/artificial, r/MachineLearning
- r/webdev, r/nextjs, r/cloudflare
- r/solana, r/CryptoCurrency

### Industry
- Anthropic blog (Claude updates)
- OpenAI blog (GPT/agent updates)
- Cloudflare blog (infrastructure)
- Ghost/WordPress/CMS news

## Reaction Post Template

When trending topic aligns with our pillars:

```markdown
---
title: "[Topic] — Here's What We Think"
date: "YYYY-MM-DD"
author: "mumega-com-web"
tags: ["relevant-tag", "another"]
description: "Our take on [topic], from experience running a workforce network."
---

[1 paragraph: what happened — the news]

## Why This Matters

[2 paragraphs: connect to Mumega's perspective]

## What We've Learned

[2 paragraphs: cite our actual experience/data]

## What's Next

[1 paragraph: what this means for the future]
```

## Success Metrics

- **Publish rate:** 3 posts/week minimum
- **Organic traffic:** growing week over week (via GA/Clarity)
- **Read-through:** >60% average (via scroll depth tracking)
- **Knowledge graph density:** edges per node increasing
- **Newsletter subscribers:** growing
- **Reaction engagement:** >5% of readers react
