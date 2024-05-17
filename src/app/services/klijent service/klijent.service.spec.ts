import { TestBed } from '@angular/core/testing';

import { KlijentService } from './klijent.service';

describe('KlijentService', () => {
  let service: KlijentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlijentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
