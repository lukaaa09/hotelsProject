import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelModel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private baseUrl = 'http://localhost:3000'

  constructor(private _http: HttpClient) { }

  public getHotels(): Observable<HotelModel[]> {
    return this._http.get<HotelModel[]>(`${this.baseUrl}/hotels`)
  }

  public deleteHotels(id: number): Observable<HotelModel[]> {
    return this._http.delete<HotelModel[]>(`${this.baseUrl}/hotels`)
  }
}
