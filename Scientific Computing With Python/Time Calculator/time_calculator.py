def add_time(start, duration, startingDay=""):
  daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  startingDay = startingDay.capitalize()
  start = start.split()
  start[0] = start[0].split(':')
  duration = duration.split(':')
 
  minutes = start[0][1]
  hours = start[0][0]
  period = start[1]
  if startingDay in daysOfTheWeek:
    day = daysOfTheWeek.index(startingDay)
    startingDay = daysOfTheWeek.index(startingDay)
    showDay = True
  else:
    day = 0
    startingDay = 0
    showDay = False

  minutesAfter = int(minutes) + int(duration[1])
  hoursAfter = int(hours) + int(duration[0])

  while minutesAfter >= 60:
    minutesAfter -= 60
    hoursAfter += 1

  while hoursAfter >= 13:
    if hoursAfter == 13 and period == "AM":
        hoursAfter -= 1
    else:
        hoursAfter -= 12
    if period == "PM":
      period = "AM"
      day += 1
    else :
      period = "PM"

  if hoursAfter == 12:
    if period == "PM":
      period = "AM"
      day += 1
    else :
      period = "PM"

  newHours = str(hoursAfter)
  newMinutes = str(minutesAfter).rjust(2, "0")
  difference = day - startingDay

  if showDay:
    newDay = ", " + daysOfTheWeek[day % 7]
  else:
    newDay = ""

  if difference > 0:
    if difference == 1:
      nextDay = " (next day)"
    else:
      nextDay = " (" + str(difference) + " days later)"
  else:
    nextDay = ""

  new_time = newHours + ":" + newMinutes + " " + period + newDay + nextDay

  return new_time