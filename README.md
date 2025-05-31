# 🤖 Discord Bot with Slash Commands and Web Interface

A modular Discord bot built with `discord.js` v14 and `express`, supporting slash commands organized by categories. Includes a web service endpoint to keep the bot alive on platforms like Render.

---

## 📁 Project Structure

```
.
├── commands/
│   └── utility/        # Contains utility slash commands (e.g. /ping, /greet, /dice, etc.)
├── deploy-commands.js  # Registers commands with Discord
├── index.js            # Main bot file with Discord client and express server
├── package.json        # Project metadata and dependencies
├── render.yaml         # Render deployment configuration
└── .env                # Environment variables (TOKEN, CLIENTID, GUILDID)
```

---

## ⚙️ Features

- **Slash Commands**: Organized using folders for better scalability.
- **Utility Commands**: `/ping`, `/greet`, `/8ball`, `/dice`, `/predict`, `/remindme`, `/define`, `/motivate`, `/roast`, `/server`, `/user`.
- **Auto Command Registration**: Automatically registers all commands on startup.
- **Express Server**: Basic HTTP server to respond to pings (e.g. for uptime bots).
- **Render Deployment Ready**: Easily deployable using Render with `render.yaml`.

---

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/discord-bot.git
cd discord-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env` file (or set via your hosting platform):

```env
TOKEN=your_discord_bot_token
CLIENTID=your_discord_application_client_id
GUILDID=your_test_server_id
PORT=3000
```

> These are also defined in `render.yaml` for Render deployment.

### 4. Register Commands (Optional if using index.js logic)

```bash
node deploy-commands.js
```

### 5. Start the Bot

```bash
node index.js
```

---

## 🌐 Deploy to Render

> Already set up with `render.yaml` — push to GitHub and connect it to Render.

### 1. Commit to GitHub  
Push your code to a GitHub repository.

### 2. Create Web Service  
On [Render.com](https://render.com/), create a new Web Service and link your GitHub repo.

### 3. Add Environment Variables  
Add the following under "Environment":

- `TOKEN`
- `CLIENTID`
- `GUILDID`

### 4. Done!  
Render will build and host your bot automatically.

---

## 🧭 Architecture Diagram

```mermaid
flowchart TB
    %% Configuration & Metadata
    subgraph "Configuration & Metadata"
        ENV[".env"]:::config
        Pkg["package.json"]:::config
        Lock["package-lock.json"]:::config
        RenderCfg["render.yaml"]:::config
    end

    %% Bot Service (Node.js Process)
    subgraph "Bot Service (Node.js Process)"
        Index["index.js\n(Discord Client & Express Server)"]:::internal
        Deploy["deploy-commands.js\n(Command Registry & Auto-Discovery Loader)"]:::internal
        Commands["commands/utility/\n(Command Handlers)"]:::internal
    end

    %% External Services
    subgraph "External Services"
        DiscordAPI["Discord API\n(WebSocket & REST)"]:::external
        Render["Render.com\n(Hosting Platform)"]:::external
    end

    %% Data Flows
    ENV -->|loads env vars| Index
    ENV -->|loads env vars| Deploy
    Index -->|loads modules| Commands
    Deploy -->|discovers commands| Commands
    Index -->|WS (Gateway)| DiscordAPI
    Index -->|HTTPS REST (register commands)| DiscordAPI
    Deploy -->|HTTPS REST (register commands)| DiscordAPI
    Render -->|HTTP GET / (health check)| Index

    %% Click Events
    click Index "https://github.com/frosty-8/discord-bot/blob/main/index.js"
    click Deploy "https://github.com/frosty-8/discord-bot/blob/main/deploy-commands.js"
    click Commands "https://github.com/frosty-8/discord-bot/tree/main/commands/utility/"
    click RenderCfg "https://github.com/frosty-8/discord-bot/blob/main/render.yaml"
    click Pkg "https://github.com/frosty-8/discord-bot/blob/main/package.json"
    click Lock "https://github.com/frosty-8/discord-bot/blob/main/package-lock.json"

    %% Styles
    classDef internal fill:#D6EAF8,stroke:#1B4F72,color:#1B2631
    classDef external fill:#D5F5E3,stroke:#145A32,color:#1D8348
    classDef config   fill:#FCF3CF,stroke:#B7950B,color:#784212
```

---

## 🧩 Example Commands

- `/ping` – Check latency
- `/remindme` – Set a timed reminder
- `/roast` – Light-hearted roasts
- `/define` – Get simple word definitions
- `/user` – Get your Discord tag and ID

---

## 🛠️ Built With

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="40" alt="Node.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" height="40" alt="Express" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="40" height="40" alt="GitHub" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" width="40" height="40" alt="Bash" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Render_logo.svg" width="80" alt="Render" />
</p>

---

## 📄 License

ISC © 2025

---

## 🙌 Credits

Created with ❤️ for learning and fun Discord automation.
