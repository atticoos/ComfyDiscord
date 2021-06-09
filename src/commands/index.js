import fetch from 'node-fetch'
import {createInteractionReply} from './createInteractionReply'
import {onSlayerContractsCommand} from './slayerContractsCommand'

export function registerCommands (client) {
  client.ws.on('INTERACTION_CREATE', interaction => {
    if (interaction.data.name === 'slayer') {
      const [command] = interaction.data.options
      const reply = createInteractionReply(interaction)

      switch (command.name) {
        case 'contracts':
          onSlayerContractsCommand(client, interaction, reply)
          break
      }
    }
  })
}
