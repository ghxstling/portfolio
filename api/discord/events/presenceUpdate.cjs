const { Events } = require('discord.js')
const dotenv = require('dotenv')

dotenv.config({ path: './.env.local' })

const userId = process.env.DISCORD_MY_USER_ID
if (!userId) {
  throw new Error('Missing DISCORD_MY_USER_ID environment variable')
}

let latestPresence = null

module.exports = {
  name: Events.PresenceUpdate,
  execute(oldPresence, newPresence) {
    if (newPresence.user.id === userId) {
      if (oldPresence?.status !== newPresence.status) {
        console.log(`SERVER: Status changed from ${oldPresence.status} to ${newPresence.status}`)
      }

      if (oldPresence?.activities.length !== newPresence.activities.length) {
        console.log(`SERVER: Activities changed from ${oldPresence.activities} to ${newPresence.activities}`)
      }

      let latestActivity = newPresence.activities[0]

      latestPresence = {
        userId: newPresence.userId,
        status: newPresence.status,
        activity: latestActivity
          ? {
              name: latestActivity.name,
              type: latestActivity.type,
              details: latestActivity.details || null,
              state: latestActivity.state || null,
              assets: latestActivity.assets,
            }
          : null,
      }
    } else {
      console.log(`SERVER: Something wrong with your user ID...`)
    }
  },
  getLatestPresence() {
    return latestPresence
  },
}
