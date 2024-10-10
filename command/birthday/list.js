import { InteractionResponseType } from 'discord-interactions'
import fs from 'fs/promises'
import path from 'path'
import { getDayDiff, getMonthString, splitDate } from '../../utils/calendar.js'

function getBirthdayData(data) {
  return data
    .map(([name, birthdate]) => {
      const { month, day } = splitDate(birthdate)

      const date = `${getMonthString(month)} ${day}`
      const dayDiff = getDayDiff({ month, day })

      return { name, date, dayDiff }
    })
    .sort((a, b) => a.dayDiff - b.dayDiff)
}

export default async function list(user, res) {
  const filePath = path.join(process.cwd(), 'data', `${user.id}.txt`)
  const fileContent = await fs.readFile(filePath, 'utf8')

  const data = fileContent
    .split(';')
    .filter(birthday => birthday)
    .map(birthday => birthday.split(':'))

  const birthdayData = getBirthdayData(data)

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: `Birthday list for ${user.global_name}`,
          description: `-# Here is the list with all birthdays added by ${user.global_name}, note that this list is unique to each user`,
          color: 0xffff00,
          fields: birthdayData.map((data, index) => ({
            name: data.name,
            value: `- ${data.date}\n- Birthday in **${data.dayDiff} days**`,
            inline: true
          }))
        }
      ]
    }
  })
}
