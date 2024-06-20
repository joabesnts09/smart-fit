import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs';
import { IUnitsResponse } from '../interfaces/units.interfaces';
import { ILocations } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root',
})
export class GetUnitsService {
  readonly apiUrl: string = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json'

  private allUnitsSubject: BehaviorSubject<ILocations[]> = new BehaviorSubject<ILocations[]>([]);
  private allUnits$: Observable<ILocations[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: ILocations[] = []

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<IUnitsResponse>(this.apiUrl).subscribe((data) => {
      this.allUnitsSubject.next(data.locations)
      this.filteredUnits = data.locations
    })
  }

  getAllUnits(): Observable<ILocations[]> {
    return this.allUnits$
  }

  getFilteredUnits(): ILocations[] {
    return this.filteredUnits
  }

  setFilteredUnits(value: ILocations[]) {
    this.filteredUnits = value
  }
}
