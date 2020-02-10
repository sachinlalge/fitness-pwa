import { TestBed } from '@angular/core/testing';

import { GetUserDetailsService } from './get-user-details.service';

describe('GetUserDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserDetailsService = TestBed.get(GetUserDetailsService);
    expect(service).toBeTruthy();
  });
});
