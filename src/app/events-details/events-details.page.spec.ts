import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsDetailsPage } from './events-details.page';

describe('EventsDetailsPage', () => {
  let component: EventsDetailsPage;
  let fixture: ComponentFixture<EventsDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
