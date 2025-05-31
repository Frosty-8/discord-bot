const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');

// Load secrets from environment variables
const token = process.env.TOKEN;
const clientID = process.env.CLIENTID;
const guildID = process.env.GUILDID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Load commands and prepare for registration
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON()); // For registration
        } else {
            console.log(`The command at ${filePath} is missing "data" or "execute".`);
        }
    }
}

// Register slash commands once the bot is ready
client.once(Events.ClientReady, async readyClient => {
    console.log(`✅ Ready! Logged in as ${readyClient.user.tag}`);

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log(`🔁 Registering ${commands.length} application (/) commands...`);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands }
        );
        console.log(`✅ Successfully registered ${data.length} commands.`);
    } catch (error) {
        console.error('❌ Failed to register commands:', error);
    }
});

// Handle slash command execution
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`❌ No command matching ${interaction.commandName} found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        const replyOptions = {
            content: '❗ There was an error while executing this command.',
            ephemeral: true,
        };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(replyOptions);
        } else {
            await interaction.reply(replyOptions);
        }
    }
});

// Start the bot
client.login(token);
