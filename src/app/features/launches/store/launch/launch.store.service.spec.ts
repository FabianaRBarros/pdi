import { TestBed } from '@angular/core/testing'

import { LaunchStoreService } from './launch.store.service'

describe('LaunchStoreService', () => {
  let service: LaunchStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaunchStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
