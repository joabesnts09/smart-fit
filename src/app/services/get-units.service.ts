import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { IUnitsResponse } from '../interfaces/units.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GetUnitsService {
  readonly apiUrl: string = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json'
  constructor(private httpClient: HttpClient) {}

  getAllUnits(): Observable<IUnitsResponse> {
    return this.httpClient.get<IUnitsResponse>(this.apiUrl)
  }
}
