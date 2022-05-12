import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtTransferDoneComponent } from './nt-transfer-done.component';

describe('NtTransferDoneComponent', () => {
  let component: NtTransferDoneComponent;
  let fixture: ComponentFixture<NtTransferDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NtTransferDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NtTransferDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
