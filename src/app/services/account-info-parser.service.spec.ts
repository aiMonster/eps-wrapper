import { TestBed } from '@angular/core/testing';

import { AccountInfoParserService } from './account-info-parser.service';

describe('AccountInfoParserService', () => {
  let service: AccountInfoParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountInfoParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
