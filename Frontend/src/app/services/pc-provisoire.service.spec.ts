import { TestBed } from '@angular/core/testing';

import { PcProvisoireService } from './pc-provisoire.service';

describe('PcProvisoireService', () => {
  let service: PcProvisoireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcProvisoireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
