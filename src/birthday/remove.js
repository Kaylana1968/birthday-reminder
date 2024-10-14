import {
  getBirthdayData,
  writeBirthdayData
} from '../../utils/filesUtils/birthday.js'
import { monthString } from '../../utils/constants/birthday.js'
import { createEphemeralMessage } from '../../utils/discord.js'

export default async function remove(user, options) {
  const number = options.find(option => option.name === 'number').value

  if (number < 0)
    return createEphemeralMessage({
      content: "You can't input a negative value"
    })

  const birthdayData = await getBirthdayData(user)
  const removedBirthday = birthdayData.splice(number - 1, 1)[0]

  if (!removedBirthday)
    return createEphemeralMessage({
      content: 'Your birthday list is not that long'
    })

  await writeBirthdayData(user, birthdayData)

  const { name, month, day } = removedBirthday

  return createEphemeralMessage({
    content: `${name}, born on ${monthString[month]} ${day}, was successfully removed`
  })
}
