import Discord from 'discord.js'
import fetch from 'node-fetch'
import {registerCommands} from './commands'
import {onNewMessage, loadSlayerContracts} from './messages/loadSlayerContracts'

const client = new Discord.Client()

registerCommands(client)

client.login(process.env.TOKEN)
client.on('message', message => onNewMessage(message))
client.on('ready', () => loadSlayerContracts(client))
