import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatedApproval } from './delegated-approval';

describe('DelegatedApproval', () => {
  let component: DelegatedApproval;
  let fixture: ComponentFixture<DelegatedApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegatedApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegatedApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
