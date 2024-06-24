import { TestBed } from '@angular/core/testing';

import { EnsureNotLoggedInGuard } from './ensure-not-logged-in.guard';

describe('EnsureNotLoggedInGuard', () => {
  let guard: EnsureNotLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnsureNotLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
