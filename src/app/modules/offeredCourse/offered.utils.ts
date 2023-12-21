import { TDays } from './offered.type'

export type TSchedule = {
  days: TDays
  startTime: string
  endTime: string
}

export const hasTimeConflict = (assign: TSchedule[], schedule: TSchedule) => {
  for (const ass of assign) {
    const exitStartTime = new Date(`1970-01-01T${ass.startTime}`)
    const exitEndTime = new Date(`1970-01-01T${ass.endTime}`)
    const upcomingStartTime = new Date(`1970-01-01T${schedule.startTime}`)
    const upcomingEndTime = new Date(`1970-01-01T${schedule.endTime}`)

    if (upcomingStartTime < exitEndTime && upcomingEndTime > exitStartTime) {
      return true
    }
  }
  return false
}
