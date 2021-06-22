import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLightboxComponent } from './modal-lightbox.component';

describe('ModalLightboxComponent', () => {
  let component: ModalLightboxComponent;
  let fixture: ComponentFixture<ModalLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLightboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
