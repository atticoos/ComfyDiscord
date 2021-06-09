import Discord from 'discord.js'
import fetch from 'node-fetch'
import {registerCommands} from './commands'
import {loadSlayerContracts} from './messages/loadSlayerContracts'
import {handleMessage} from './db/contracts'

const client = new Discord.Client()

registerCommands(client)
client.on('message', handleMessage)
client.on('ready', () => loadSlayerContracts(client))
client.login(process.env.TOKEN)
