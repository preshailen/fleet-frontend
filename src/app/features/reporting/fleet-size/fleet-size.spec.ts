import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetSize } from './fleet-size';

describe('FleetSize', () => {
  let component: FleetSize;
  let fixture: ComponentFixture<FleetSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetSize]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetSize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
