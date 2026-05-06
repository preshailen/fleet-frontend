import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingMasterRecord } from './testing-master-record';

describe('TestingMasterRecord', () => {
  let component: TestingMasterRecord;
  let fixture: ComponentFixture<TestingMasterRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingMasterRecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingMasterRecord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
