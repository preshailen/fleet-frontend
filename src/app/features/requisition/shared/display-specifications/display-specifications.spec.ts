import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySpecifications } from './display-specifications';

describe('DisplaySpecifications', () => {
  let component: DisplaySpecifications;
  let fixture: ComponentFixture<DisplaySpecifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySpecifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySpecifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
