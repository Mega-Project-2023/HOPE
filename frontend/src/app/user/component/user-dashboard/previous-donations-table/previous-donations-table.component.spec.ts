import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousDonationsTableComponent } from './previous-donations-table.component';

describe('PreviousDonationsTableComponent', () => {
  let component: PreviousDonationsTableComponent;
  let fixture: ComponentFixture<PreviousDonationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousDonationsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousDonationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
