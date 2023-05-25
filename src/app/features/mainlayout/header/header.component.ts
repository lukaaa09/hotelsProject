import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../../../core/services/hotels.service';
import { HotelModel } from '../../../core/models/hotel.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  hotels: HotelModel[] = []
  constructor(private _hotelsService: HotelsService) {
  }

  ngOnInit() {
    this._hotelsService.getHotels().subscribe(data => {
      this.hotels = data
    })
  }
}
