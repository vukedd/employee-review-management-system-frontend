import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvaluationPeriodComponent } from './create-evaluation-period.component';

describe('CreateEvaluationPeriodComponent', () => {
  let component: CreateEvaluationPeriodComponent;
  let fixture: ComponentFixture<CreateEvaluationPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEvaluationPeriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEvaluationPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
