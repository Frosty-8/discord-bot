// motivate.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('motivate')
        .setDescription('Receive a motivational quote'),
    async execute(interaction) {
        const quotes = [
            "Believe you can and you're halfway there.",
            "You are capable of amazing things.",
            "Don't watch the clock; do what it does. Keep going.",
            "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        await interaction.reply(quote);
    },
};
