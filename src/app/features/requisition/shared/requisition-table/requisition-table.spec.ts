import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionTable } from './requisition-table';

describe('RequisitionTable', () => {
  let component: RequisitionTable;
  let fixture: ComponentFixture<RequisitionTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisitionTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitionTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
