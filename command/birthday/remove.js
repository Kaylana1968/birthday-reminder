import { InteractionResponseType } from 'discord-interactions'
import {
  getBirthdayData,
  writeBirthdayData
} from '../../utils/birthdayManager.js'
import { getMonthString } from '../../utils/calendar.js'

export default async function remove(user, options, res) {
  const number = options.find(option => option.name === 'number').value

  if (number < 0) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "You can't input a negative value"
      }
    })
  }

  const birthdayData = await getBirthdayData(user)

  const removedBirthday = birthdayData.splice(number - 1, 1)[0]

  if (!removedBirthday) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'Your birthday list is not that long'
      }
    })
  }

  const { name, month, day } = removedBirthday

  await writeBirthdayData(user, birthdayData)

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${name}, born on ${getMonthString(
        month
      )} ${day}, was successfully removed`
    }
  })
}
