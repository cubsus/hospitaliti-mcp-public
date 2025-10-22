# Hospitaliti Jobs Knowledge Base MCP Server

This project implements a **Model Context Protocol (MCP)** server that allows an LLM to query job-related data from the **Hospitaliti Jobs API**.

It exposes a single tool called `search_jobs_knowledge_base` that sends search queries to the backend API and returns the results as JSON.

---

## Features

* Connects to Hospitaliti API (`/api/mcp/search`)
* Responds to LLM tool requests via MCP
* Simple JSON-based query structure
* Configurable API base URL through environment variables
* Requires LLM configuration to point to the correct MCP server URL

---

## Installation

```bash
npm install
```

---

## Usage

Run the MCP server:

```bash
node server.js
```

This will start a server that communicates using the **Model Context Protocol**, exposing a tool to search the knowledge base.

Make sure your **LLM configuration** (e.g., in your client or IDE) is set to connect to this MCP server’s endpoint — typically something like:

```
"mcpServers": {
  "hospitaliti-jobs": {
    "command": "node",
    "args": ["path/to/server.js"]
  }
}
```

or, if running remotely:

```
"mcpServers": {
  "hospitaliti-jobs": {
    "url": "http://your-server-domain:port"
  }
}
```

---

## Notes

* Uses only official `@modelcontextprotocol` SDK packages
* Compatible with any LLM that supports the Model Context Protocol
* No pivot models or unnecessary dependencies