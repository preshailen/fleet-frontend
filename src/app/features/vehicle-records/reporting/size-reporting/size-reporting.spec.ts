import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeReporting } from './size-reporting';

describe('SizeReporting', () => {
  let component: SizeReporting;
  let fixture: ComponentFixture<SizeReporting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeReporting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeReporting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
