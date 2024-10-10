import { InteractionResponseType } from 'discord-interactions'
import fs from 'fs/promises'
import path from 'path'
import { getDayDiff, getMonthString, splitDate } from '../../utils/calendar.js'

function getDescription(data) {
  const descriptionData = []

  data.forEach(([name, birthdate]) => {
    const { month, day } = splitDate(birthdate)

    const dayDiff = getDayDiff({ month, day })

    const namePart = `${name}\n`
    const datePart = `  - ${getMonthString(month)} ${day}\n`
    const diffPart = `  - ${dayDiff} days to birthday\n`

    descriptionData.push({
      text: `${namePart} ${datePart} ${diffPart}\n`,
      dayDiff
    })
  })

  return descriptionData
    .sort((a, b) => a.dayDiff - b.dayDiff)
    .map((description, index) => `${index + 1}. ${description.text}`)
    .join('')
}

export default async function list(user, res) {
  const filePath = path.join(process.cwd(), 'data', `${user.id}.txt`)
  const fileContent = await fs.readFile(filePath, 'utf8')

  const data = fileContent
    .split(';')
    .filter(birthday => birthday)
    .map(birthday => birthday.split(':'))

  const description = getDescription(data)

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: `birthday list for ${user.global_name}`,
          description: description
        }
      ]
    }
  })
}
