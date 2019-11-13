import { TestBed } from '@angular/core/testing';

import { GoToDashboardService } from './go-to-dashboard.service';

describe('GoToDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoToDashboardService = TestBed.get(GoToDashboardService);
    expect(service).toBeTruthy();
  });
});
