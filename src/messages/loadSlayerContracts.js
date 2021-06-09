const slayerGroupId = '851977041922621511'
const validChannelIds = [
  '851959486189010944'
]

const contracts = {}

const wait = (ttl = 5000) => new Promise(resolve => setTimeout(resolve, ttl))

export function lookupContractsForPlayer (playerId) {
  return contracts[playerId]
}

export function isSlayerContractMessage (message) {
  const hasSlayerMention = !!message.mentions.roles.find(role => role.id === slayerGroupId)
  const hasPlayerMention = message.mentions.users.size > 0
  return hasSlayerMention && hasPlayerMention
}

export function onNewMessage (message) {
  if (isSlayerContractMessage(message)) {
    console.log('Detected new slayer contract')
    recordSlayerMessage(message)
  }
}

async function fetchMessages (channel, cursor) {
  console.log('fetching messages @cursor:', cursor);

  const messages = await channel.messages.fetch({limit: 100, before: cursor})

  if (messages.size <= 0) {
    return
  }

  messages.forEach(message => {
    if (isSlayerContractMessage(message)) {
      recordSlayerMessage(message)
    }
  })

  const messageArray = [...messages.values()]
  const lastMessage = messageArray[messageArray.length - 1];

  // 1 req/s
  await wait(2500)
  return await fetchMessages(channel, lastMessage.id)
}


export async function loadSlayerContracts (client, playerId) {
  for (let i = 0; i < validChannelIds.length; i++) {
    const channelId = validChannelIds[i]
    const channel = await client.channels.fetch(channelId)
    await fetchMessages(channel)
  }
  // const channel = await client.channels.fetch('851959486189010944')
  // await fetchMessages(channel)
  console.log('contracts', contracts);
}

function recordSlayerMessage(message) {
  message.mentions.users.forEach(userMention => {
    registerUserContract(userMention, message)
  })
}

const registerUserContract = (user, message) => {
  if (!contracts[user.id]) {
    contracts[user.id] = []
  }
  contracts[user.id].push(message.id)
}
