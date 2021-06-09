import Discord from 'discord.js'
import {lookupContractsForPlayer} from '../messages/loadSlayerContracts'

export function onSlayerContractsCommand (client, interaction, reply) {
  console.log('interaction payload', interaction.data)
  const [arg] = interaction.data.options
  const playerId = arg.value

  const slayerContracts = lookupContractsForPlayer(playerId)

  const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`Atticoos' Slayer Contracts`)
    .addFields(
      {name: 'Total Contracts', value: slayerContracts.length, inline: true},
      {name: 'This Week', value: Math.floor(slayerContracts.length / 2), inline: true}
    )
    // Render a list of contract messages
    .setTimestamp()
  reply({embeds: [exampleEmbed.toJSON()]})
}



// client.api.interaction(interaction.id, interaction.token).callback.post({
//   type: 4,
//   data: {content: 'Hello World'}
// })
