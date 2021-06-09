const contracts = {}

const slayerGroupId = '851977041922621511'
export const contractChannelIds = [
  '851959486189010944'
]

export function handleMessage (message) {
  if (isSlayerContractMessage(message)) {
    recordSlayerContractMessage(message)
  }
}

export function isSlayerContractMessage (message) {
  // const isContractChannel = contractChannelIds.indexOf(message.channel.id) > -1
  const hasSlayerMention = message.mentions.roles.find(role => role.id === slayerGroupId)
  const hasPlayerMention = message.mentions.users.size > 0
  return hasSlayerMention && hasPlayerMention
}

export function recordSlayerContractMessage (message) {
  if (!isSlayerContractMessage(message)) {
    return;
  }

  message.mentions.users.forEach(user => {
    if (!contracts[user.id]) {
      contracts[user.id] = []
    }
    contracts[user.id].push(message.id)
  })
}

export function lookupContractsByPlayer (playerId) {
  return contracts[playerId]
}

export function getContracts() {
  return contracts
}
