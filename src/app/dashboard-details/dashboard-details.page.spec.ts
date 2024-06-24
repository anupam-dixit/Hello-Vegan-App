import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardDetailsPage } from './dashboard-details.page';

describe('DashboardDetailsPage', () => {
  let component: DashboardDetailsPage;
  let fixture: ComponentFixture<DashboardDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
