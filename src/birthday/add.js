import {
  getBirthdayData,
  writeBirthdayData
} from '../../utils/filesUtils/birthday.js'
import { monthMaxDay, monthString } from '../../utils/constants/birthday.js'
import { splitDate } from '../../utils/helpers/birthday.js'
import { createEphemeralMessage } from '../../utils/discord.js'

function stringToDate(date) {
  if (!date.includes('/')) return

  const { month, day } = splitDate(date)

  if (isNaN(month) || month < 1 || month > 12) return
  if (isNaN(day) || day < 1 || day > monthMaxDay[month]) return

  return { month, day }
}

export default async function add(user, options) {
  const name = options.find(option => option.name === 'name').value
  const birthdateString = options.find(
    option => option.name === 'birthdate'
  ).value

  const birthdate = stringToDate(birthdateString)

  if (!birthdate) {
    return createEphemeralMessage({
      content: 'The date given is invalid, try again'
    })
  }

  const { month, day } = birthdate

  const birthdayData = await getBirthdayData(user)
  birthdayData.push({ name, month, day })

  await writeBirthdayData(user, birthdayData)

  return createEphemeralMessage({
    content: `${name}, born on ${monthString[month]} ${day}, was successfully added`
  })
}
