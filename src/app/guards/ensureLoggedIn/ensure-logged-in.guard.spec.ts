import { TestBed } from '@angular/core/testing';

import { EnsureLoggedInGuard } from './ensure-logged-in.guard';

describe('EnsureLoggedInGuard', () => {
  let guard: EnsureLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnsureLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
