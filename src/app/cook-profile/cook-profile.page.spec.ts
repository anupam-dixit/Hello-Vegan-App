import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookProfilePage } from './cook-profile.page';

describe('CookProfilePage', () => {
  let component: CookProfilePage;
  let fixture: ComponentFixture<CookProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CookProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
