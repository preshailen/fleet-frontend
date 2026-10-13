import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetSpend } from './fleet-spend';

describe('FleetSpend', () => {
  let component: FleetSpend;
  let fixture: ComponentFixture<FleetSpend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetSpend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetSpend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
