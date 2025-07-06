import { TestBed } from '@angular/core/testing';

import { ConcreteEvaluationService } from './concrete-evaluation.service';

describe('ConcreteEvaluationService', () => {
  let service: ConcreteEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcreteEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
