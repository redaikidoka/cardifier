import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandDropdownComponent } from './hand-dropdown.component';

describe('HandDropdownComponent', () => {
  let component: HandDropdownComponent;
  let fixture: ComponentFixture<HandDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
