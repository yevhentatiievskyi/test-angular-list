import { TestBed } from '@angular/core/testing';

import { RolesDataSourceService } from './roles-data-source.service';

describe('RolesDataSourceService', () => {
  let service: RolesDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
