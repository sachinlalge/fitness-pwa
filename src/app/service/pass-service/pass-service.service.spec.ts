import { TestBed } from '@angular/core/testing';

import { PassServiceService } from './pass-service.service';

describe('PassServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassServiceService = TestBed.get(PassServiceService);
    expect(service).toBeTruthy();
  });
});
