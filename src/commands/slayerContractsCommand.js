import Discord from 'discord.js'
import {lookupContractsByPlayer} from '../messages/contracts'

const icon = 'https://icons.iconarchive.com/icons/chrisl21/minecraft/128/Iron-Sword-icon.png'

export function onSlayerContractsCommand (client, interaction, reply) {
  console.log('interaction payload', interaction.data)
  const [{value: playerId}] = interaction.data.options
  const user = interaction.data.resolved.users[playerId]
  const contracts = lookupContractsByPlayer(playerId)
  const replyMessage = createContractsMessageEmbed(user, slayerContracts)
  return reply({embeds: [replyMessage.toJSON()]})
}

const createContractsMessageEmbed = (user, contracts) => new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle(`${user.username}`)
  .setDescription('Slayer Contracts')
  .addFields(
    {name: 'Total Contracts', value: slayerContracts.length, inline: true},
    {name: 'This Week', value: Math.floor(slayerContracts.length / 2), inline: true}
  )
  .setThumbnail()
  .setFooter('Last contract: 3 hrs ago', icon)
