const { Events } = require('discord.js')
const dotenv = require('dotenv')
dotenv.config({ path: './.env.local' })

const channelId = process.env.DISCORD_CHANNEL_ID
if (!channelId) {
  throw new Error('Missing DISCORD_CHANNEL_ID environment variable')
}

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const channel = client.channels.cache.get(channelId)
    if (!channel) {
      console.error('SERVER: [ERROR] Channel not found!')
      return
    }
    channel.send('Hello! I am online!')
    console.log(`SERVER: Discord Bot ${client.user.tag} is online!`)
  },
}
