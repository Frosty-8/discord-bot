// user.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Display your user info'),
    async execute(interaction) {
        await interaction.reply(`Username: ${interaction.user.tag}\nID: ${interaction.user.id}`);
    },
};
