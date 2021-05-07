import { TestBed } from '@angular/core/testing';

import { BitcoinBalanceService } from './bitcoin-balance.service';

describe('BitcoinBalanceService', () => {
  let service: BitcoinBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitcoinBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
