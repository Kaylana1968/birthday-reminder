import add from './add.js'
import list from './list.js'
import remove from './remove.js'

export default async function birthday(user, data) {
  let response
  switch (data.name) {
    case 'add':
      response = await add(user, data.options)
      break

    case 'list':
      response = await list(user)
      break

    case 'remove':
      response = await remove(user, data.options)
      break

    default:
      console.error(`unknown command: ${data.name}`)
      response = null
  }

  return response
}
