import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  selectedCategory: EventEmitter<string> = new EventEmitter<string>()
  searchChanged: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  emitSearchChanged(title: string): void {
    this.searchChanged.emit(title)
  }

  emitSelectedCategory(category: string) {
    this.selectedCategory.emit(category)
  }


}
