import { TestBed } from '@angular/core/testing';

import { GetAllUsersService } from './get-all-users.service';

describe('GetAllUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAllUsersService = TestBed.get(GetAllUsersService);
    expect(service).toBeTruthy();
  });
});
