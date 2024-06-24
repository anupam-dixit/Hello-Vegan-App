import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatingPage } from './chating.page';

describe('ChatingPage', () => {
  let component: ChatingPage;
  let fixture: ComponentFixture<ChatingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
