import { TestBed } from '@angular/core/testing';

import { LigneInternetService } from './ligne-internet.service';

describe('LigneInternetService', () => {
  let service: LigneInternetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneInternetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
