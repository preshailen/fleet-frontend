import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteTable } from './quote-table';

describe('QuoteTable', () => {
  let component: QuoteTable;
  let fixture: ComponentFixture<QuoteTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
