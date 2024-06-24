import { TestBed } from '@angular/core/testing';

import { SubscriptionLimiterGuard } from './subscription-limiter.guard';

describe('SubscriptionLimiterGuard', () => {
  let guard: SubscriptionLimiterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SubscriptionLimiterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
