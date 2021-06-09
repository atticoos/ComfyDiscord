import fetch from 'node-fetch'


// `discord.api.interaction(id, token).callback.post(...)` keeps 404ing so im doing it manually
export const createInteractionReply = interaction => data => fetch(
  `https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`,
  {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      type: 4,
      data
    })
  }
)
