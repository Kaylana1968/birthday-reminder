import { InteractionResponseType } from 'discord-interactions'
import { getBirthdayData } from '../../utils/birthdayManager.js'
import { getMonthString } from '../../utils/calendar.js'

export default async function list(user, res) {
  const birthdayData = await getBirthdayData(user)

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: `Birthday list for ${user.global_name}`,
          description: `-# Here is the list with all birthdays added by ${user.global_name}, note that this list is unique to each user`,
          color: 0xffff00,
          fields: birthdayData.map((data, index) => ({
            name: `${index + 1}. ${data.name}`,
            value: `- ${getMonthString(data.month)} ${
              data.day
            }\n- Birthday in **${data.dayDiff} days**`,
            inline: true
          }))
        }
      ]
    }
  })
}
