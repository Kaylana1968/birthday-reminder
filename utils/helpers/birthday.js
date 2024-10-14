import { monthMaxDay } from '../constants/birthday.js'

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function getDayDiff(date) {
  const { month, day } = date
  const today = new Date()

  let diff = day - today.getDate()

  const thisMonth = today.getMonth() + 1
  const thisYear = today.getFullYear()

  if (month === thisMonth && diff > 0) {
    return diff
  }

  let currentMonth = thisMonth
  do {
    diff +=
      currentMonth === 2 &&
      !(
        (isLeapYear(thisYear) && thisMonth <= 2) ||
        (isLeapYear(thisYear + 1) && thisMonth > 2)
      )
        ? 28
        : monthMaxDay[currentMonth]

    currentMonth = currentMonth + 1 > 12 ? 1 : currentMonth + 1
  } while (currentMonth !== month)

  return diff
}

export function splitDate(date) {
  const [month, day] = date.split('/').map(info => parseInt(info))

  return { month, day }
}
