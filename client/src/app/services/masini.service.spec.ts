import { TestBed } from '@angular/core/testing';

import { MasiniService } from './masini.service';

describe('MasiniService', () => {
  let service: MasiniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasiniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
