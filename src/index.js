import birthday from './birthday/index.js'

export default async function executer(user, data, res) {
  let response
  switch (data.name) {
    case 'birthday':
      response = await birthday(user, data.options[0])
      break

    default:
      console.error(`unknown command: ${data.name}`)
      response = null
  }

  return response
    ? res.send(response)
    : res.status(400).json({ error: 'unknown command' })
}
