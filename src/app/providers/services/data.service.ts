import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  	constructor() { }

  	private contentTop = new Subject<number>();

  	getContentTop() {
      return this.contentTop.asObservable();
   }

   setContentTop(cTop: number) {
      this.contentTop.next(cTop);
   }
}
