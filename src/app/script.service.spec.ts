import { TestBed } from '@angular/core/testing';

import { StripeScriptService } from './script.service';

describe('ScriptService', () => {
  let service: StripeScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripeScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
