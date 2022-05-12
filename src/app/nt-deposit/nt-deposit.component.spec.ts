import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtDepositComponent } from './nt-deposit.component';

describe('NtDepositComponent', () => {
  let component: NtDepositComponent;
  let fixture: ComponentFixture<NtDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NtDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NtDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
