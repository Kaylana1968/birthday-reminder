import { getBirthdayData } from '../../utils/filesUtils/birthday.js'
import { monthString } from '../../utils/constants/birthday.js'
import { createEphemeralMessage } from '../../utils/discord.js'

export default async function list(user) {
  const birthdayData = await getBirthdayData(user)

  return createEphemeralMessage({
    embeds: [
      {
        title: `Birthday list for ${user.global_name}`,
        description: `-# Here is the list with all birthdays added by ${user.global_name}, note that this list is unique to each user`,
        color: 0xffff00,
        fields: birthdayData.map((data, index) => ({
          name: `${index + 1}. ${data.name}`,
          value: `- ${monthString[data.month]} ${data.day}\n- Birthday in **${
            data.dayDiff
          } days**`,
          inline: true
        }))
      }
    ]
  })
}
