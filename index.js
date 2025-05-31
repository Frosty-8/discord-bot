const fs = require('node:fs');
const path = require('node:path');
const express = require('express');          
const { Client, Events, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');

const token   = process.env.TOKEN;           
const clientID = process.env.CLIENTID;       
const guildID  = process.env.GUILDID;        
const PORT     = process.env.PORT || 3000;   

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commands = [];
const foldersPath  = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command  = require(filePath);

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());      
    } else {
      console.log(`⚠️  Command at ${filePath} is missing "data" or "execute".`);
    }
  }
}

client.once(Events.ClientReady, async readyClient => {
  console.log(`✅ Ready! Logged in as ${readyClient.user.tag}`);

  const rest = new REST({ version: '10' }).setToken(token);
  try {
    console.log(`🔁 Registering ${commands.length} application (/) commands…`);
    const data = await rest.put(
      Routes.applicationGuildCommands(clientID, guildID),
      { body: commands }
    );
    console.log(`✅ Successfully registered ${data.length} commands.`);
  } catch (err) {
    console.error('❌ Failed to register commands:', err);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) {
    console.error(`❌ No command matching ${interaction.commandName} found.`);
    return;
  }

  try {
    await cmd.execute(interaction);
  } catch (err) {
    console.error(err);
    const reply = {
      content: '❗ There was an error while executing this command.',
      ephemeral: true,
    };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
});

client.login(token);

const app = express();
app.get('/', (_req, res) => res.send('🤖 Discord bot is running!'));

app.listen(PORT, () =>
  console.log(`🌐 Web service listening on port ${PORT}`)
);
