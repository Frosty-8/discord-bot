// define.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define')
        .setDescription('Define a simple common word')
        .addStringOption(option =>
            option.setName('word')
                .setDescription('Word to define')
                .setRequired(true)),
    async execute(interaction) {
        const word = interaction.options.getString('word').toLowerCase();
        const fakeDictionary = {
            javascript: 'A programming language commonly used for web development.',
            bot: 'A software application that runs automated tasks over the internet.',
            discord: 'A platform for communities to chat via text, voice, and video.',
            meme: 'A humorous image, video, or text shared widely online.'
        };

        const definition = fakeDictionary[word] || "Sorry, I don't know that word (yet)!";
        await interaction.reply(`📚 **${word}**: ${definition}`);
    },
};
