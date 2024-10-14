import fs from 'fs/promises'
import path from 'path'
import { getDayDiff, splitDate } from '../helpers/birthday.js'

export async function getBirthdayData(user) {
  const filePath = path.join(process.cwd(), 'data', `${user.id}.txt`)
  const fileContent = await fs.readFile(filePath, 'utf8')

  return fileContent
    .split(';')
    .filter(birthday => birthday)
    .map(birthday => {
      const [name, birthdate] = birthday.split(':')
      const { month, day } = splitDate(birthdate)
      const dayDiff = getDayDiff({ month, day })

      return { name, month, day, dayDiff }
    })
    .sort((a, b) => a.dayDiff - b.dayDiff)
}

export async function writeBirthdayData(user, data) {
  const filePath = path.join(process.cwd(), 'data', `${user.id}.txt`)

  await fs.writeFile(
    filePath,
    data
      .map(birthday => `${birthday.name}:${birthday.month}/${birthday.day}`)
      .join(';')
  )
}
