import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MySubscriptionPage } from './my-subscription.page';

describe('MySubscriptionPage', () => {
  let component: MySubscriptionPage;
  let fixture: ComponentFixture<MySubscriptionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MySubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
