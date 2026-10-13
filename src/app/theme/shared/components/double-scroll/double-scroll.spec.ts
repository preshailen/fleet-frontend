import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleScroll } from './double-scroll';

describe('DoubleScroll', () => {
  let component: DoubleScroll;
  let fixture: ComponentFixture<DoubleScroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoubleScroll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleScroll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
