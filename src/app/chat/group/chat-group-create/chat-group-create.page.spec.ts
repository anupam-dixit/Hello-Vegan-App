import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatGroupCreatePage } from './chat-group-create.page';

describe('ChatGroupCreatePage', () => {
  let component: ChatGroupCreatePage;
  let fixture: ComponentFixture<ChatGroupCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatGroupCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
