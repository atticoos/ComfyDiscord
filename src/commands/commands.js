import fetch from 'node-fetch'
import {createInteractionReply} from './createInteractionReply'
import {onSlayerContractsCommand} from './slayerContractsCommand'

export function registerCommands (client) {
  client.ws.on('INTERACTION_CREATE', interaction => {
    const onReply = createInteractionReply(interaction)

    if (interaction.data.name === 'slayer') {
      const [command] = interaction.data.options

      switch (command.name) {
        case 'contracts':
          onSlayerContractsCommand(interaction, onReply)
          break
      }
    }
  })
}
