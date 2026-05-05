import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendReporting } from './spend-reporting';

describe('SpendReporting', () => {
  let component: SpendReporting;
  let fixture: ComponentFixture<SpendReporting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpendReporting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendReporting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
