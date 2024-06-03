import { TestBed } from '@angular/core/testing';

import { EchipamentService } from './echipament.service';

describe('EchipamentService', () => {
  let service: EchipamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EchipamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
