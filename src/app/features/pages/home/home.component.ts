import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HotelsService } from '../../../core/services/hotels.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { HotelModel } from '../../../core/models/hotel.model';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { AddFormDialogComponent } from '../../partials/add-form-dialog/add-form-dialog.component';
import { EditFormComponent } from '../../partials/edit-form/edit-form.component';
import { DeleteComponent } from '../../partials/delete/delete.component';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../../../core/services/search.service';


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

  public username = localStorage.getItem('username')

  constructor(private _hotelsService: HotelsService,
              private _authService: AuthService,
              private _toastr: ToastrService,
              public dialog: MatDialog,
              private router: Router,
              private _searchService: SearchService) {
  }

  ngOnInit(): void {
    console.log(this.username)
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
          secondImage: hotel.secondImage,
          thirdImage: hotel.thirdImage,
          fourthImage: hotel.fourthImage,
          fifthImage: hotel.fifthImage,
          owner: hotel.owner
        }
      })
      console.log(this.dataSource.data)
    })
    this._searchService.searchChanged.subscribe((searchText: string) => {
      this.dataSource.filter = searchText.trim().toLowerCase()
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  openDetailsPage(id: number) {
    this.router.navigateByUrl(`/hotelDetails/${id}`).then()
  }

  deleteItemDialog(id: number) {
    const selectedHotel = this.dataSource.data.find((hotel) => hotel.id === id);

    if(selectedHotel?.owner === this.username) {
      const dialogRef = this.dialog.open(DeleteComponent, {
        data: selectedHotel
      });


      dialogRef.afterClosed().subscribe((checkIfItemIsDeleted: boolean) => {
        if (checkIfItemIsDeleted) {
          this.dataSource.data = this.dataSource.data.filter((hotels) => hotels.id !== id)
        }
      });
    }else {
      this._toastr.error('You can only delete hotels added by yourself')
    }
  }

  openEditForm(id: number) {
    const selectedHotel = this.dataSource.data.filter((hotel) => hotel.id === id)

    if(selectedHotel[0].owner === this.username) {
      const dialogRef = this.dialog.open(EditFormComponent, {
        data: selectedHotel[0]
      });
      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.dataSource.data = this.dataSource.data.map((res) => {
            if (res.id === result.id) {
              return result
            }
            return res
          })
        }
      } );
    }else {
      this._toastr.error('You can only update hotels added by yourself')

    }
  }

  openFormDialog() {
    if (this._authService.isLoggedIn) {
      const dialogRef = this.dialog.open(AddFormDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(result )
        if (result) {

          result.owner = this.username
          this.hotels.push(result)
          this.dataSource.data = this.hotels
        }
      });
    }else {
      this._toastr.error('If you want to add hotel you must register')
    }
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

}
