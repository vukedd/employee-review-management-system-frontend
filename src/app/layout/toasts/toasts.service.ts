import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastsPositionService {

 toastPosition: 'top-right' | 'top-center' = 'top-right';

  constructor() {
    if (typeof window !== 'undefined') {
      this.setToastPosition(window.innerWidth);
      window.addEventListener('resize', () => {
        this.setToastPosition(window.innerWidth);
      });
    }
  }

  private setToastPosition(width: number): void {
    this.toastPosition = width < 768 ? 'top-center' : 'top-right';
  }

  getPosition() {
    return this.toastPosition;
  }
}