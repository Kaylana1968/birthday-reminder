export function getMonthMaxDay(month) {
  month = typeof month === 'string' ? parseInt(month) : month

  switch (month) {
    case 1:
      return 31

    case 2:
      return 29

    case 3:
      return 31

    case 4:
      return 30

    case 5:
      return 31

    case 6:
      return 30

    case 7:
      return 31

    case 8:
      return 31

    case 9:
      return 30

    case 10:
      return 31

    case 11:
      return 30

    case 12:
      return 31

    default:
      return
  }
}

export function getMonthString(month) {
  month = typeof month === 'string' ? parseInt(month) : month

  switch (month) {
    case 1:
      return 'January'

    case 2:
      return 'February'

    case 3:
      return 'March'

    case 4:
      return 'April'

    case 5:
      return 'May'

    case 6:
      return 'June'

    case 7:
      return 'July'

    case 8:
      return 'August'

    case 9:
      return 'September'

    case 10:
      return 'October'

    case 11:
      return 'November'

    case 12:
      return 'December'

    default:
      return
  }
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function getDayDiff(date) {
  const { month, day } = date
  const today = new Date()

  let diff = day - today.getDate()

  const thisMonth = today.getMonth() + 1
  const thisYear = today.getFullYear()

  for (
    let currentMonth = thisMonth;
    currentMonth !== month;
    currentMonth = currentMonth === 12 ? 1 : currentMonth + 1
  ) {
    diff -=
      currentMonth === 2 &&
      ((isLeapYear(thisYear) && thisMonth <= 2) ||
        (isLeapYear(thisYear + 1) && thisMonth > 2))

    diff += getMonthMaxDay(currentMonth)
  }

  return diff
}

export function splitDate(date) {
  const [month, day] = date.split('/').map(info => parseInt(info))

  return { month, day }
}
