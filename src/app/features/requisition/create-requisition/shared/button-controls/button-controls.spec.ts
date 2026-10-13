import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonControls } from './button-controls';

describe('ButtonControls', () => {
  let component: ButtonControls;
  let fixture: ComponentFixture<ButtonControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
