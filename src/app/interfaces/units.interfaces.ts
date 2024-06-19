import { ILocations } from './location.interface'

export interface IUnitsResponse {
    current_country_id: number
    locations: ILocations[]
}