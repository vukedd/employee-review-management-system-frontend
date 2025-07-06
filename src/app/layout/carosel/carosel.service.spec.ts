import { TestBed } from '@angular/core/testing';

import { CaroselService } from './carosel.service';

describe('CaroselService', () => {
  let service: CaroselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaroselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
