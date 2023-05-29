import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelsService } from '../../../core/services/hotels.service';
import { HotelModel } from '../../../core/models/hotel.model';
import { AddHotelModel } from '../../../core/models/add-hotel.model';

@Component({
  selector: 'app-add-form-dialog',
  templateUrl: './add-form-dialog.component.html',
  styleUrls: ['./add-form-dialog.component.scss']
})
export class AddFormDialogComponent implements OnInit{

  formGroup = new FormGroup({
    id: new FormControl ('',Validators.required),
    title: new FormControl('', [Validators.required] ),
    price: new FormControl( '', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(10)] ),
    imageUrl: new FormControl('', [Validators.required] ),
    area: new FormControl('', [Validators.required])

  })

  constructor(private _hotelsService: HotelsService) {
  }

  ngOnInit() {
  }

  addHotel(): void {
    this._hotelsService.addHotel(this.formGroup.value as AddHotelModel).subscribe()
  }

}
