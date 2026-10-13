import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalRequirements } from './operational-requirements';

describe('OperationalRequirements', () => {
  let component: OperationalRequirements;
  let fixture: ComponentFixture<OperationalRequirements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalRequirements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalRequirements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
