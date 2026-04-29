import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRecord } from './upload-record';

describe('UploadRecord', () => {
  let component: UploadRecord;
  let fixture: ComponentFixture<UploadRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadRecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadRecord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
