import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceInformation } from './compliance-information';

describe('ComplianceInformation', () => {
  let component: ComplianceInformation;
  let fixture: ComponentFixture<ComplianceInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplianceInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceInformation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
