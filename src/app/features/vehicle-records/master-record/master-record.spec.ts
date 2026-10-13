import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRecord } from './master-record';

describe('MasterRecord', () => {
  let component: MasterRecord;
  let fixture: ComponentFixture<MasterRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterRecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterRecord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
