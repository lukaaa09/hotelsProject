import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotelModel } from '../../../core/models/hotel.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddHotelModel } from '../../../core/models/add-hotel.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit{
  formGroup = new FormGroup<any>('')
  constructor(@Inject(MAT_DIALOG_DATA) public hotel: HotelModel) {
    console.log(this.hotel)
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
    this.formGroup.patchValue(this.hotel)
    console.log(this.formGroup)
  }

}
