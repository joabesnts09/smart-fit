import { Injectable } from '@angular/core'
import { ILocations } from '../interfaces/location.interface'

const OPENING_HORS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  night: {
    first: '18',
    last: '23'
  },
}


type HOUR_INDEX = 'morning' | 'afternoon' | 'night'

@Injectable({
  providedIn: 'root',
})
export class FilterUnitsService {
  constructor() {}

  transformWeekday(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sáb.'
      default:
        return 'Seg. à Sex.'
    }
  }

  filterUnits(unit: ILocations, openHour: string, closeHour: string) {

    if (!unit.schedules) return true

    const openHourFilter = parseInt(openHour, 10)
    const closeHourFilter = parseInt(closeHour, 10)

    const todayWeekday = this.transformWeekday(new Date().getDay())

    for(let i = 0; i < unit.schedules.length; i++) {
      const scheduleHour = unit.schedules[i].hour
      const scheduleWeekday = unit.schedules[i].weekdays

      if (todayWeekday === scheduleWeekday) {
        if (scheduleHour !== 'Fechada') {
          const [unitOpenHour, unitCloseHour] = scheduleHour.split(' às ')
          const unitOpenHourInt = parseInt(unitOpenHour.replace('h', ''), 10)
          const unitCloseHourInt = parseInt(unitCloseHour.replace('h', ''), 10)

          if (unitOpenHourInt <= openHourFilter && unitCloseHourInt >= closeHourFilter) return true
          else return false
        }
      }
    }

    return false
  }

  filter(results: ILocations[], showClosed: boolean, hour: string) {
    let intermediateResult = results

    if(!showClosed) {
      intermediateResult = results.filter(location => location.opened === true)
    } 
    
    if (hour){
      const OPEN_HOUR = OPENING_HORS[hour as HOUR_INDEX].first
      const CLOSED_HOUR = OPENING_HORS[hour as HOUR_INDEX].last

      // this.filteredResults = this.results.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSED_HOUR))
      return intermediateResult.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSED_HOUR))
    } else {
      return intermediateResult
    }
  }
}
