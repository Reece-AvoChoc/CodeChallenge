import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInTouchPopupComponent } from './get-in-touch-popup.component';

describe('GetInTouchPopupComponent', () => {
  let component: GetInTouchPopupComponent;
  let fixture: ComponentFixture<GetInTouchPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetInTouchPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetInTouchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
