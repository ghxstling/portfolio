const { Events } = require('discord.js')
const dotenv = require('dotenv')
dotenv.config({ path: './.env.local' })

const channelId = process.env.DISCORD_CHANNEL_ID
if (!channelId) {
  throw new Error('Missing DISCORD_CHANNEL_ID environment variable')
}

module.exports = {
  name: Events.Error,
  execute(client, error) {
    console.error(`SERVER: [ERROR] Discord Bot encountered an error: ${error}`)

    const channel = client.channels.cache.get(channelId)
    if (!channel) {
      console.error('SERVER: [ERROR] Channel not found!')
      return
    }

    channel.send(`Help! I ran into an error: \`\`\`${error}\`\`\``).catch((sendError) => {
      console.error('SERVER: Failed to send error message to the channel:', sendError)
    })
  },
}
