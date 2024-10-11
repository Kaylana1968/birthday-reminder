import { InteractionResponseType } from 'discord-interactions'
import {
  getBirthdayData,
  writeBirthdayData
} from '../../utils/birthdayManager.js'
import { getMonthString } from '../../utils/calendar.js'

export default async function remove(user, options) {
  const number = options.find(option => option.name === 'number').value

  if (number < 0)
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "You can't input a negative value"
      }
    }

  const birthdayData = await getBirthdayData(user)
  const removedBirthday = birthdayData.splice(number - 1, 1)[0]

  if (!removedBirthday)
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'Your birthday list is not that long'
      }
    }

  await writeBirthdayData(user, birthdayData)

  const { name, month, day } = removedBirthday

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${name}, born on ${getMonthString(
        month
      )} ${day}, was successfully removed`
    }
  }
}
