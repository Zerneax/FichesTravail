import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  generateRandomNumber(min, max) {
    return Math.ceil((Math.random() * max) + min);
  }
}
