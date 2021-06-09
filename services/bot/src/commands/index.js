import fetch from 'node-fetch'
import {createInteractionReply} from '../util/createInteractionReply'
import {onContractsCommand} from './contracts'

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
        switch (command.name) {
          case Command.CONTRACTS:
            onContractsCommand(client, interaction, reply)
            break;
        }
        break;
    }
  })
}
