import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfAgreement } from './type-of-agreement';

describe('TypeOfAgreement', () => {
  let component: TypeOfAgreement;
  let fixture: ComponentFixture<TypeOfAgreement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeOfAgreement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfAgreement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
