import {
  contractChannelIds,
  handleMessage,
  getContracts
} from './contracts'

const wait = (ttl = 5000) => new Promise(resolve => setTimeout(resolve, ttl))

async function fetchMessages (channel, cursor) {
  console.log('fetching messages @cursor:', cursor);

  const messages = await channel.messages.fetch({
    limit: 100, before: cursor
  })

  if (messages.size <= 0) {
    return
  }

  messages.forEach(handleMessage)

  const messageArray = [...messages.values()]
  const lastMessage = messageArray[messageArray.length - 1];

  // 1 req/s
  await wait(2500)
  return await fetchMessages(channel, lastMessage.id)
}


export async function loadSlayerContracts (client, playerId) {
  for (let i = 0; i < contractChannelIds.length; i++) {
    const channelId = contractChannelIds[i]
    const channel = await client.channels.fetch(channelId)
    await fetchMessages(channel)
  }
  console.log('contracts', getContracts());
}
