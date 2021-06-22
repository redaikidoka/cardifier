import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandBlocksComponent } from './hand-blocks.component';

describe('HandBlocksComponent', () => {
  let component: HandBlocksComponent;
  let fixture: ComponentFixture<HandBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandBlocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
