import { TestBed } from '@angular/core/testing';

import { HrjobService } from './hrjob.service';

describe('HrjobService', () => {
  let service: HrjobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrjobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
