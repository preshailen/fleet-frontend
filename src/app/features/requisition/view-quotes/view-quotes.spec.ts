import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuotes } from './view-quotes';

describe('ViewQuotes', () => {
  let component: ViewQuotes;
  let fixture: ComponentFixture<ViewQuotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
