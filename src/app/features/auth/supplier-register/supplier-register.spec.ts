import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegister } from './supplier-register';

describe('SupplierRegister', () => {
  let component: SupplierRegister;
  let fixture: ComponentFixture<SupplierRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
