import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendslistPage } from './friendslist.page';

describe('FriendslistPage', () => {
  let component: FriendslistPage;
  let fixture: ComponentFixture<FriendslistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FriendslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
