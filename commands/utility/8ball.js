// 8ball.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8-ball a yes/no question')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your yes/no question')
                .setRequired(true)),
    async execute(interaction) {
        const responses = [
            'Yes', 'No', 'Definitely', 'Absolutely not', 'Ask again later',
            'It is certain', 'I have my doubts', 'Not in a million years', 'You bet!', 'No chance'
        ];
        const question = interaction.options.getString('question');
        const reply = responses[Math.floor(Math.random() * responses.length)];
        await interaction.reply(`🎱 **Question:** ${question}\n**Answer:** ${reply}`);
    },
};
