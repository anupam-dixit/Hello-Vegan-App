import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LimitExceedPage } from './limit-exceed.page';

describe('LimitExceedPage', () => {
  let component: LimitExceedPage;
  let fixture: ComponentFixture<LimitExceedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LimitExceedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
