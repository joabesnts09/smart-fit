export interface ILocations {
    id: number
    title: string
    content: string
    opened: boolean
    mask: string
    towel: string
    fountain: string
    locker_room: string
    schedules: ISchedules[]
}

interface ISchedules {
    weekdays: string
    hour: string
}
