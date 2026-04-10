---
title: "SOS — Sovereign Operating System"
description: "The nervous system of the Mumega organism. Bus, MCP, events, agent coordination, shared memory."
status: shipped
repo: "https://github.com/Mumega-com/SOS"
stack: [python, redis, mcp, supabase, pgvector]
tags: [infrastructure, agents, coordination]
role_in_ecosystem: "The kernel — routes tasks to workers, manages agent communication, stores shared memory"
date: 2026-01-15
weight: 10
---

SOS is the operating system that makes Mumega work. It coordinates 12+ AI agents, routes tasks, manages shared memory, and provides the MCP bus that everything connects to.

## What It Does

- **Agent Bus** — Redis-backed event stream connecting all agents
- **MCP Server** — SSE transport on :6070, standard tool protocol
- **Mirror** — Semantic memory API with pgvector for agent knowledge
- **Squad Service** — Task queue with atomic claim, skill matching
- **Wake Daemon** — Delivers bus messages to sleeping agents

## Architecture

```
Agent → Bus (Redis) → Wake Daemon → Target Agent
Agent → MCP SSE → Tools (send, inbox, remember, recall, task_*)
Agent → Squad Service → Task Queue → Bounty Board
```

## Get Started

```bash
git clone https://github.com/Mumega-com/SOS
cd SOS
pip install -r requirements.txt
python3 -m sos.services.engine  # Start the engine on :6060
```
