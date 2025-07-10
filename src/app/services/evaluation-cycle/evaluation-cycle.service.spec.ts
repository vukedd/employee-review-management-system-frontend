import { TestBed } from '@angular/core/testing';

import { EvaluationCycleService } from './evaluation-cycle.service';

describe('EvaluationCycleService', () => {
  let service: EvaluationCycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationCycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
