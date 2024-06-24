import { TestBed } from '@angular/core/testing';

import { DataLakeService } from './data-lake.service';

describe('DataLakeService', () => {
  let service: DataLakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
