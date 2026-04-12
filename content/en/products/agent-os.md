---
title: "Agent OS"
description: "Deploy a team of AI agents that share memory, coordinate tasks, and search code — on your own server. Open source. MCP-native."
price: "open source"
marketplace: github
marketplace_url: "https://github.com/Mumega-com/sos"
tags: [agents, mcp, infrastructure, open-source, memory, coordination]
features:
  - MCP-native bus — Claude Code, Codex, and any MCP agent on one network
  - Shared memory across all agents via pgvector semantic search
  - Code graph search — find functions by description across every repo
  - Multi-model engine with failover (Gemini, Claude, GPT, Grok, Ollama)
  - Squad service for task queues, skills, and pipeline orchestration
  - Runs on a single $20/mo VPS — no cloud lock-in
status: available
date: 2026-04-12
weight: 9
---

Agent OS is two open source services — **SOS** and **Mirror** — that turn a collection of AI agents into a coordinated team.

SOS is the bus. Mirror is the brain. Together they give your agents a shared nervous system.

## The Problem It Solves

Most teams run AI agents in isolation. Each session starts blank. Agents can't message each other. Context gets lost between handoffs. You end up being the coordinator — copy-pasting between tools, repeating yourself, managing state manually.

Agent OS fixes this at the infrastructure level.

## How It Works

```
Your agents (Claude Code, Codex, any MCP client)
        │
        │  one URL — MCP SSE or stdio
        ▼
      SOS (:6070)
      ├── Redis bus — real-time agent messaging
      ├── Squad service — tasks, skills, pipelines
      └── Multi-model engine — Gemini / Claude / GPT failover
        │
        ▼
    Mirror (:8844)
    ├── Engrams — semantic memory shared across all agents
    ├── pgvector — cosine similarity search over 20K+ memories
    └── Code search — find functions by description, any repo
```

## What Agents Can Do Out of the Box

| Tool | What it does |
|------|-------------|
| `send` / `inbox` | Direct agent-to-agent messaging |
| `broadcast` | Message all agents at once |
| `remember` | Store a memory in the shared pool |
| `recall` | Retrieve memories by semantic similarity |
| `search_code` | Find functions and classes by description |
| `task_create` | Create a task for any agent |
| `task_list` / `task_update` | Manage the task queue |
| `peers` / `status` | See who's online and what they're doing |
| `onboard` | Self-register a new agent on the bus |

## Connect Claude Code in 30 Seconds

```json
{
  "mcpServers": {
    "sos": {
      "type": "sse",
      "url": "http://your-server:6070/sse/your-token"
    }
  }
}
```

Restart Claude Code. Your agent now has all 15 tools.

## Connect Codex

```toml
[mcp_servers.sos]
command = "python3"
args = ["/path/to/sos/mcp/sos_mcp.py"]

[mcp_servers.sos.env]
AGENT_NAME = "codex"
REDIS_PASSWORD = "your-password"
```

Same tools. Same bus. Different transport.

## Shared Memory That Persists

Every memory stored by any agent is searchable by every other agent — across sessions, across tools, across time.

```bash
# Kasra stores something
mcp__sos__remember("torivers billing uses Stripe webhooks, not polling")

# Codex retrieves it two weeks later, different session
mcp__sos__recall("how does torivers handle payments")
# → "torivers billing uses Stripe webhooks, not polling" (score: 0.91)
```

20,925 engrams in the current deployment. All searchable in milliseconds.

## Code Search Across Every Repo

Index your codebases once. Search forever.

```bash
mcp__sos__search_code("authentication middleware", repo="torivers")
# → [Function] verify_token  apps/auth/middleware.py:45 (score: 0.88)
# → [Class] JWTHandler       apps/auth/jwt.py:12 (score: 0.81)
```

Supports Python, TypeScript, JavaScript, Go, Rust, and more via Tree-sitter.

## Run It Yourself

```bash
# Clone both services
git clone https://github.com/Mumega-com/sos
git clone https://github.com/Mumega-com/mirror

# Start Mirror (memory layer)
cd mirror && pip install -r requirements.txt
psql -c "CREATE DATABASE mirror;" && psql -d mirror -f schema.sql
python3 mirror_api.py

# Start SOS (bus + coordination)
cd ../sos && pip install -r requirements.txt
python3 -m sos.mcp.sos_mcp_sse    # MCP bus :6070
python3 -m sos.services.engine    # Engine :6060
python3 -m sos.services.squad.app # Tasks :8060
```

Full setup guide in the [SOS README](https://github.com/Mumega-com/sos) and [Mirror README](https://github.com/Mumega-com/mirror).

## Architecture Diagrams

Sequence flows, network topology, transport comparison, and multi-model routing diagrams:
→ [Agent Wiring Docs](https://github.com/Mumega-com/sos/blob/main/docs/architecture/AGENT_WIRING.md)
