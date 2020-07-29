import { TestBed } from '@angular/core/testing';

import { BaseDataSourceService } from './base-data-source.service';

describe('BaseDataSourceService', () => {
  let service: BaseDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
