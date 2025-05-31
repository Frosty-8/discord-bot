// predict.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('predict')
        .setDescription('Receive a mysterious prediction about your future'),
    async execute(interaction) {
        const predictions = [
            'You will find a mysterious coin tomorrow.',
            'Someone unexpected will message you soon.',
            'A big opportunity is on your way.',
            'Beware of penguins.',
            'Your memes will go viral.'
        ];
        const prediction = predictions[Math.floor(Math.random() * predictions.length)];
        await interaction.reply(`🔮 ${prediction}`);
    },
};
