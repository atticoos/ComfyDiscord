import fetch from 'node-fetch'

const baseURL = 'https://discord.com/api/v8'


// `discord.api.interaction(id, token).callback.post(...)` keeps 404ing so im doing it manually
export const createInteractionReply = interaction => data =>
  POST(`${baseURL}/interactions/${interaction.id}/${interaction.token}/callback`, {
      type: 4,
      data
    })

const POST = (url, data) => console.log('POST', {url, data}) || fetch(url, {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(data)
})
