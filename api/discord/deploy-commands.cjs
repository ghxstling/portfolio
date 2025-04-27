const { REST, Routes } = require('discord.js')
const dotenv = require('dotenv')
const fs = require('node:fs')
const path = require('node:path')

dotenv.config({ path: './.env.local' })
const token = process.env.DISCORD_BOT_TOKEN
const clientId = process.env.DISCORD_CLIENT_ID
const guildId = process.env.DISCORD_GUILD_ID

if (!token || !clientId || !guildId) {
  throw new Error(
    'Missing one of the following environment variables: DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID'
  )
}

const commands = []
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder)
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.cjs'))
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON())
    } else {
      console.log(`SERVER: [WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token)

// and deploy your commands!
const deploy = async () => {
  try {
    console.log(`SERVER: Started refreshing ${commands.length} application (/) commands.`)

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })

    console.log(`SERVER: Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
}
deploy()
