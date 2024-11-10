import { TestBed } from '@angular/core/testing';

import { ThemealdbAPIService } from './themealdb-api.service';

describe('ThemealdbAPIService', () => {
  let service: ThemealdbAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemealdbAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
