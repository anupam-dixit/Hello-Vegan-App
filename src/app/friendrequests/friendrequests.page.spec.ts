import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendrequestsPage } from './friendrequests.page';

describe('FriendrequestsPage', () => {
  let component: FriendrequestsPage;
  let fixture: ComponentFixture<FriendrequestsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FriendrequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
