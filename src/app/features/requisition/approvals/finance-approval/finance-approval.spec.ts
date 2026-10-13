import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceApproval } from './finance-approval';

describe('FinanceApproval', () => {
  let component: FinanceApproval;
  let fixture: ComponentFixture<FinanceApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
