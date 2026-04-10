---
title: "ToRivers — AI Automation Marketplace"
description: "Build, sell, and run AI automations. Pay-per-execution. Developers build by chatting with Claude Code, customers pay pennies per run."
status: shipped
repo: "https://github.com/torivers"
stack: [nextjs, typescript, langgraph, supabase, celery, redis, stripe, mcp]
tags: [marketplace, automation, ai, developer-tools]
role_in_ecosystem: "The marketplace — where automations built by agents and developers meet customers who need them"
date: 2026-02-01
weight: 10
---

ToRivers is an AI automation marketplace with near-zero marginal cost economics. Developers build workflows, customers run them, and the platform handles billing, credentials, and execution.

## Why It Exists

AI automation is becoming commodified. Distribution and developer experience are not. ToRivers abstracts away infrastructure so developers focus on logic, and customers just press "run."

## How It Works

1. **Developers** build automations using the Python SDK (`pip install torivers-sdk`) or by chatting with Claude Code via MCP
2. **Automations** run on LangGraph with Celery workers — scheduled, webhook-triggered, or manual
3. **Customers** browse the marketplace, install automations, and pay per execution from a wallet
4. **Credentials** are encrypted with AES-256-GCM — third-party code never sees API keys

## What's Running

- **SEO Flywheel** — weekly automation for Viamar: pulls GA4 + GSC + Clarity analytics, generates optimization decisions, updates WordPress automatically
- **Marketplace dashboard** — browse, filter, install, execute
- **Developer portal** — submit automations, track analytics, earn revenue
- **Wallet + Stripe billing** — top up, pay per run, auto-refund on failure

## The Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, tRPC, Supabase Auth |
| Execution | FastAPI, Celery, Redis, LangGraph |
| AI Models | Gemma 4 (local, free), Gemini, Claude |
| Billing | Stripe wallets, per-execution pricing |
| Distribution | MCP server (30 tools), PyPI SDK |
| Security | AES-256-GCM credential proxy, JWT isolation |

## What Makes It Different

- **MCP-native** — accessible from Claude Code, not just a website. Developers build automations by chatting.
- **Zero marginal cost** — open models (Gemma 4, Apache 2.0) mean workflows run for pennies
- **Credential isolation** — third-party code never touches API keys. Unlocks trust for a developer marketplace.
- **SDK on PyPI** — `pip install torivers-sdk` and start building

## Links

- [App](https://app.torivers.com)
- [Marketing site](https://torivers.com)
- [Engine](https://engine.torivers.com)
