import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequisition } from './create-requisition';

describe('CreateRequisition', () => {
  let component: CreateRequisition;
  let fixture: ComponentFixture<CreateRequisition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRequisition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRequisition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
