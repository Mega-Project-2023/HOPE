import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDonationsTableComponent } from './pending-donations-table.component';

describe('PendingDonationsTableComponent', () => {
  let component: PendingDonationsTableComponent;
  let fixture: ComponentFixture<PendingDonationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDonationsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingDonationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
