import fetch from 'node-fetch'
import {createInteractionReply} from './createInteractionReply'
import {onSlayerContractsCommand} from './slayerContractsCommand'

const Interaction = {
  SLAYER: 'slayer'
}

const Command = {
  CONTRACTS: 'contracts'
}

export function registerCommands (client) {
  client.ws.on('INTERACTION_CREATE', interaction => {
    const [command] = interaction.data.options
    const reply = createInteractionReply(interaction)

    switch (interaction.data.name) {
      case Interaction.SLAYER:
        switch (command) {
          case Command.CONTRACTS:
            onSlayerContractsCommand(interaction, reply)
        }
    }
  })
}
