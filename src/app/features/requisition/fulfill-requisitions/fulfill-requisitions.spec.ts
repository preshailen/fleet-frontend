import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillRequisitions } from './fulfill-requisitions';

describe('FulfillRequisitions', () => {
  let component: FulfillRequisitions;
  let fixture: ComponentFixture<FulfillRequisitions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FulfillRequisitions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FulfillRequisitions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
