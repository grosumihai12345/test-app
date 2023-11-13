import { TestBed } from '@angular/core/testing';

import { PersoaneService } from './persoane.service';

describe('PersoaneService', () => {
  let service: PersoaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersoaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
