import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureRecord } from './capture-record';

describe('CaptureRecord', () => {
  let component: CaptureRecord;
  let fixture: ComponentFixture<CaptureRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureRecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptureRecord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
