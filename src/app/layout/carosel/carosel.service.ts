import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaroselSizeService {

 cardNumber: 1 | 3 = 3;

  constructor() {
    if (typeof window !== 'undefined') {
      this.setCardNumber(window.innerWidth);
      window.addEventListener('resize', () => {
        this.setCardNumber(window.innerWidth);
      });
    }
  }

  private setCardNumber(width: number): void {
    this.cardNumber = width < 768 ? 1 : 3;
  }

  getPosition() {
    return this.cardNumber;
  }
}