import { TestBed } from '@angular/core/testing';

import { GetUserWorkService } from './get-user-work.service';

describe('GetUserWorkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserWorkService = TestBed.get(GetUserWorkService);
    expect(service).toBeTruthy();
  });
});
