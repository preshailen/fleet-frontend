import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCentreApproval } from './cost-centre-approval';

describe('CostCentreApproval', () => {
  let component: CostCentreApproval;
  let fixture: ComponentFixture<CostCentreApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostCentreApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostCentreApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
