import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HotelsService } from '../../../core/services/hotels.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { HotelModel } from '../../../core/models/hotel.model';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { DialogoptionsComponent } from '../../partials/dialogoptions/dialogoptions.component';
import {filter} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  hotels: HotelModel[] = []
  isContextVisible: boolean = false
  displayedColumns: string[] = ['select', 'id', 'image', 'title', 'description', 'area', 'price', 'actions'];
  dataSource = new MatTableDataSource<HotelModel>([]);
  selection = new SelectionModel<HotelModel>(true, []);
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;


  constructor(private _hotelsService: HotelsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._hotelsService.getHotels().subscribe(data => {
      this.hotels = data
      this.dataSource.data = this.hotels.map((hotel, index) => {
        return {
          id: hotel.id ,
          imageUrl: hotel.imageUrl,
          title: hotel.title,
          area: hotel.area,
          price: hotel.price,
          description: hotel.description,
          actions: hotel.actions,
          isHovered: hotel.isHovered,
        }
      })
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogoptionsComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger?.focus());
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: HotelModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onRowClick(event: MouseEvent, row: HotelModel) {
    event.stopPropagation();
    this.selection.toggle(row);
    if (this.selection.isSelected(row)){
      this.isContextVisible = !this.isContextVisible
      console.log(this.isContextVisible)
    }
  }

  isRowHovered(row: HotelModel): boolean {
    return (this.selection.isSelected(row) && !this.selection.isEmpty()) || row.isHovered;
  }

  isRowSelected(row: HotelModel): boolean {
    return this.selection.isSelected(row);
  }

  public deleteHotels(id: number): void {
    this._hotelsService.deleteHotels(id).subscribe(() => {
      this.hotels = this.hotels.filter((hotels) => hotels.id !== id)
    })
  }
}
