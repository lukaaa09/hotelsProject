import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HotelsService } from '../../../core/services/hotels.service';
import { BehaviorSubject, tap } from 'rxjs';
import { HotelModel } from '../../../core/models/hotel.model';
import {  Router } from '@angular/router';
import { SharedService } from '../../../core/services/shared.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainpageComponent implements OnInit {
  hotels: BehaviorSubject<HotelModel[]> = new BehaviorSubject<HotelModel[]>([])
  currentImageIndex = 0;
  allHotels: HotelModel[] = [];

  searchText: string = ''; // Initialize searchText property


  constructor(private _hotelsService: HotelsService,
              private _route: Router,
              private _sharedService: SharedService) {
  }

  ngOnInit() {
    this._hotelsService.getHotels().pipe(
      tap(res => {
        this.allHotels = res.map(hotel => ({ ...hotel, currentImageIndex: 0 }));
        this.hotels.next(this.allHotels);
      })
    ).subscribe();

    this._sharedService.searchChanged.subscribe((searchText: string) => {
      this.searchText = searchText;
      this.filterHotels();
    });
  }

  openDetailsPage(id: number) {
    this._route.navigateByUrl(`/hotelDetails/${id}`).then()
  }

  filterHotels() {
    if (this.searchText.trim() === '') {
      this.hotels.next(this.allHotels);
    } else {
      const filteredHotels = this.allHotels.filter((hotel: HotelModel) =>
        hotel.title.toLowerCase().includes(this.searchText.toLowerCase())
      );

      this.hotels.next(filteredHotels);
    }
  }

  getImageUrl(item: HotelModel): string {
    const imageIndex = item.currentImageIndex;
    switch (imageIndex) {
      case 0:
        return item.imageUrl;
      case 1:
        return item.secondImage;
      case 2:
        return item.thirdImage;
      case 3:
        return item.fourthImage;
      case 4:
        return item.fifthImage;
      default:
        return item.imageUrl;
    }
  }
  changeImage(item: HotelModel, newIndex: number) {
    item.currentImageIndex = newIndex;
  }

  nextImage(item: HotelModel) {
    item.currentImageIndex = (item.currentImageIndex + 1) % 5;
  }

  prevImage(item: HotelModel) {
    item.currentImageIndex = (item.currentImageIndex - 1 + 5) % 5;
  }
}


