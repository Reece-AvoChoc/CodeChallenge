import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInPromptComponent } from './log-in-prompt.component';

describe('LogInPromptComponent', () => {
  let component: LogInPromptComponent;
  let fixture: ComponentFixture<LogInPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInPromptComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogInPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
