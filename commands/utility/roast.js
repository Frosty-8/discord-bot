// roast.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roast')
        .setDescription('Gently roast a friend')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to roast')
                .setRequired(true)),
    async execute(interaction) {
        const roasts = [
            "You're like a cloud. When you disappear, it's a beautiful day.",
            "You're not stupid; you just have bad luck thinking.",
            "You're proof that even evolution takes a break sometimes.",
            "You're like a software update—annoying and unnecessary.",
            "You're the human version of a typo."
        ];
        const target = interaction.options.getUser('target');
        const roast = roasts[Math.floor(Math.random() * roasts.length)];
        await interaction.reply(`🔥 <@${target.id}>, ${roast}`);
    },
};
