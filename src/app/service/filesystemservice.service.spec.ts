import { TestBed } from '@angular/core/testing';

import { FileSystemService } from './filesystemservice.service';

describe('FilesystemserviceService', () => {
  let service: FileSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
