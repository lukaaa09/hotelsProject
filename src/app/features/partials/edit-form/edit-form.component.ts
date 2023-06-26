import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotelModel } from '../../../core/models/hotel.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelsService } from '../../../core/services/hotels.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit{
  formGroup = new FormGroup<any>('')
  constructor(@Inject(MAT_DIALOG_DATA) public hotel: HotelModel,
              private _hotelsService: HotelsService,
              private  _dialogRef: MatDialogRef<any>) {
  }

  ngOnInit() {
    this.formGroup =  new FormGroup({
      id: new FormControl (this.hotel.id,Validators.required),
      title: new FormControl(this.hotel.title, [Validators.required] ),
      price: new FormControl( this.hotel.price, Validators.required),
      description: new FormControl(this.hotel.description, [Validators.required] ),
      imageUrl: new FormControl(this.hotel.imageUrl, [Validators.required] ),
      area: new FormControl(this.hotel.area, [Validators.required]),
      actions: new FormControl(this.hotel.actions, [Validators.required])
    })
  }

  updateHotels() {
    this._hotelsService.updateHotels(this.hotel.id, this.formGroup.value).subscribe(updateHotel => {
      this.hotel = updateHotel
      this._dialogRef.close(updateHotel)
      console.log(updateHotel)
    })
  }

}
