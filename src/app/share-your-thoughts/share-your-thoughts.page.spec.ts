import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareYourThoughtsPage } from './share-your-thoughts.page';

describe('ShareYourThoughtsPage', () => {
  let component: ShareYourThoughtsPage;
  let fixture: ComponentFixture<ShareYourThoughtsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShareYourThoughtsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
