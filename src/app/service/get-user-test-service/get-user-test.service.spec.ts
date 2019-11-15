import { TestBed } from '@angular/core/testing';

import { GetUserTestService } from './get-user-test.service';

describe('GetUserTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserTestService = TestBed.get(GetUserTestService);
    expect(service).toBeTruthy();
  });
});
