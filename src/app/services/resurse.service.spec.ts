/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResurseService } from './resurse.service';

describe('Service: Resurse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResurseService]
    });
  });

  it('should ...', inject([ResurseService], (service: ResurseService) => {
    expect(service).toBeTruthy();
  }));
});
