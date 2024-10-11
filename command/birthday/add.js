import { InteractionResponseType } from 'discord-interactions'
import {
  getBirthdayData,
  writeBirthdayData
} from '../../utils/birthdayManager.js'
import {
  getMonthMaxDay,
  getMonthString,
  splitDate
} from '../../utils/calendar.js'

function stringToDate(date) {
  if (!date.includes('/')) return

  const { month, day } = splitDate(date)

  if (isNaN(month) || month < 1 || month > 12) return
  if (isNaN(day) || day < 1 || day > getMonthMaxDay(month)) return

  return { month, day }
}

export default async function add(user, options) {
  const name = options.find(option => option.name === 'name').value
  const birthdateString = options.find(
    option => option.name === 'birthdate'
  ).value

  const birthdate = stringToDate(birthdateString)

  if (!birthdate) {
    return {
      type: 4,
      data: {
        content: 'The date given is invalid, try again'
      }
    }
  }

  const { month, day } = birthdate

  const birthdayData = await getBirthdayData(user)
  birthdayData.push({ name, month, day })

  await writeBirthdayData(user, birthdayData)

  return {
    type: 4,
    data: {
      content: `${name}, born on ${getMonthString(
        month
      )} ${day}, was successfully added`
    }
  }
}
