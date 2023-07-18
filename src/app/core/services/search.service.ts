import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchChanged: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  emitSearchChanged(title: string): void {
    this.searchChanged.emit(title)
  }
}
