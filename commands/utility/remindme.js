// remindme.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remindme')
        .setDescription('Set a short reminder')
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('Time in seconds')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Reminder message')
                .setRequired(true)),
    async execute(interaction) {
        const seconds = interaction.options.getInteger('seconds');
        const message = interaction.options.getString('message');

        await interaction.reply(`⏰ I’ll remind you in ${seconds} seconds: "${message}"`);

        setTimeout(() => {
            interaction.followUp(`${interaction.user}, here's your reminder: **${message}**`);
        }, seconds * 1000);
    },
};
