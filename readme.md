# groq-open-web-ui-api-facade-ts

A TypeScript-based API facade that connects a custom UI (e.g., Open WebUI) with the [Groq API](https://groq.com/). It supports structured tool calls, database queries, and smooth communication with LLMs such as LLaMA3 via a simple REST API.

---

## 🔧 Features

- **Express REST API** with the following endpoints:
  - `/api/tags` – Returns model metadata
  - `/api/version` – Returns API version
  - `/api/chat` – Handles chat interactions with LLM
- **Integration with Groq LLMs** (e.g., LLaMA3-8B)
- **Tool call support** for structured reasoning tasks
- **YAML-based tool definitions**
- **Database queries via tools**:
  - `getDataBaseSchema`: Returns the MySQL schema
  - `query`: Executes SQL statements

---

## 🚀 Quick Start

### Requirements

- Node.js >= 18
- TypeScript
- A Groq API Key
- MySQL database (used for tool calls)
