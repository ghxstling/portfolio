const { SlashCommandBuilder } = require('discord.js')
const dotenv = require('dotenv')

dotenv.config({ path: './.env.local' })

const userId = process.env.DISCORD_MY_USER_ID
if (!userId) {
  throw new Error('Missing DISCORD_MY_USER_ID environment variable')
}

module.exports = {
  data: new SlashCommandBuilder().setName('quit').setDescription('Disconnects the bot.'),
  async execute(interaction) {
    if (interaction.user.id !== userId) {
      await interaction.reply('You are not allowed to use this command.')
    }
    await interaction.reply('Goodbye!')
    console.log(`SERVER: Shutting down Discord Bot ...`)
    await interaction.client.destroy()
  },
}
