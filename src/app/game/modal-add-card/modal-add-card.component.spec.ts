import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCardComponent } from './modal-add-card.component';

describe('ModalAddCardComponent', () => {
  let component: ModalAddCardComponent;
  let fixture: ComponentFixture<ModalAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
