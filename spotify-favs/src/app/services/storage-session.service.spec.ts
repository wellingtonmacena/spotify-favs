import { TestBed } from '@angular/core/testing';

import { StorageSessionService } from './storage-session.service';

describe('StorageSessionService', () => {
  let service: StorageSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
