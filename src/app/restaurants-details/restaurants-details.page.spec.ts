import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantsDetailsPage } from './restaurants-details.page';

describe('RestaurantsDetailsPage', () => {
  let component: RestaurantsDetailsPage;
  let fixture: ComponentFixture<RestaurantsDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RestaurantsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
