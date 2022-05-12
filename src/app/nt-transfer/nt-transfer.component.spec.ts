import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtTransferComponent } from './nt-transfer.component';

describe('NtTransferComponent', () => {
  let component: NtTransferComponent;
  let fixture: ComponentFixture<NtTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NtTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NtTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
