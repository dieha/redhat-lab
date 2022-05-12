import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtRecordComponent } from './nt-record.component';

describe('NtRecordComponent', () => {
  let component: NtRecordComponent;
  let fixture: ComponentFixture<NtRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NtRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NtRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
