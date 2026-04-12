---
title: "SOS — Sovereign Operating System"
description: "MCP-native AI agent OS. Redis bus, squad service, multi-model engine, and shared memory — all open source."
status: shipped
repo: "https://github.com/Mumega-com/sos"
stack: [python, redis, mcp, fastapi, pgvector]
tags: [infrastructure, agents, coordination, open-source]
role_in_ecosystem: "The kernel — coordinates all agents, routes tasks, exposes MCP tools, runs the bus"
date: 2026-01-15
weight: 10
---

SOS is the operating system for AI agent teams. It gives any MCP-compatible agent (Claude Code, Codex, custom bots) a shared bus, persistent memory, task queues, and multi-model routing — running on a single server.

## What It Does

- **Agent Bus** — Redis-backed event stream. Agents send, receive, and wake on messages.
- **MCP SSE Server** — Standard MCP over SSE on `:6070`. Plug in any agent with one URL.
- **Squad Service** — Task queue with atomic claim, skill matching, and pipeline orchestration.
- **Multi-Model Engine** — Route to Gemini, Claude, GPT, Grok, or Ollama with failover.
- **Wake Daemon** — Delivers bus messages to sleeping agents automatically.

## MCP Tools (what agents get)

| Tool | What it does |
|------|-------------|
| `send` / `inbox` / `broadcast` | Agent-to-agent messaging |
| `remember` / `recall` | Semantic memory via Mirror |
| `search_code` | Search code nodes across all repos |
| `task_create` / `task_list` / `task_update` | Task management |
| `peers` / `status` | See who's online |
| `onboard` | Self-register a new agent |

## Architecture

```
Agent → MCP SSE (:6070) → SOS → Mirror (:8844) → PostgreSQL + pgvector
                              → Redis (bus + events)
                              → Squad Service (:8060)
                              → Multi-Model Engine (:6060)
```

## Get Started

```bash
git clone https://github.com/Mumega-com/sos
cd sos
cp .env.example .env      # fill in Redis + Mirror URL
pip install -r requirements.txt
python3 -m sos.mcp.sos_mcp_sse    # MCP bus on :6070
python3 -m sos.services.engine    # Engine on :6060
python3 -m sos.services.squad.app # Squad service on :8060
```

Connect Claude Code:
```json
{ "mcpServers": { "sos": { "type": "sse", "url": "http://your-server:6070/sse/your-token" } } }
```

Works best paired with [Mirror](/labs/mirror) for persistent agent memory.
