import { InteractionResponseType } from 'discord-interactions'
import fs from 'fs/promises'
import path from 'path'
import {
  getMonthMaxDay,
  getMonthString,
  splitDate
} from '../../utils/calendar.js'

function stringToDate(date) {
  if (!date.includes('/')) {
    return false
  }

  const { month, day } = splitDate(date)

  if (isNaN(month) || month < 1 || month > 12) {
    return false
  }

  if (isNaN(day) || day < 1 || day > getMonthMaxDay(month)) {
    return false
  }

  return { month, day }
}

export default async function add(user, options, res) {
  const name = options.find(option => option.name === 'name').value
  const birthdate = options.find(option => option.name === 'birthdate').value

  const filePath = path.join(process.cwd(), 'data', `${user.id}.txt`)
  const fileContent = await fs.readFile(filePath, 'utf8')

  const birthdateData = stringToDate(birthdate)

  if (!birthdateData) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'The date given is invalid, try again'
      }
    })
  }

  fs.writeFile(filePath, `${fileContent}${name}:${birthdate};`)

  const { month, day } = birthdateData

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${name}, born on ${getMonthString(
        month
      )} ${day}, was successfully added`
    }
  })
}
