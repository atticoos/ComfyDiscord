import Discord from 'discord.js'
import {getContractsByPlayer} from '../db/contracts'

const icon = 'https://icons.iconarchive.com/icons/chrisl21/minecraft/128/Iron-Sword-icon.png'

const space = size => [...new Array(size)].map(() => '\u2800').join('')

export async function onContractsCommand (client, interaction, reply) {
  console.log('interaction payload', interaction)
  const [{value: playerId}] = interaction.data.options
  const guild = await client.guilds.fetch('172543236781506561')
  const user = await guild.members.fetch(playerId)
  const contracts = getContractsByPlayer(playerId)
  const replyMessage = createContractsMessage(user, contracts)
  return reply({embeds: [replyMessage.toJSON()]})
}

const createContractsMessage = (user, contracts) => new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setAuthor(user.nickname, icon)
  .setDescription(`Contracts ${space(20)}`)
  .addFields(
    {name: 'Rank', value: 'Theign', inline: true},
    {name: 'Total', value: contracts.length, inline: true},
    {name: 'Week', value: Math.floor(contracts.length / 2), inline: true}
  )
  .setFooter('Last contract: 3 hrs ago')
