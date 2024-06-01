import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface FileInfo {
  name: string;
  directory: boolean;
  extension: string;
  size: number;
  lastModified: number;
  content?: string;
  lastLine?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  listDirectory(path: string): Observable<FileInfo[]> {
    return this.http.get<FileInfo[]>(
      `${this.baseUrl}/directories?path=${encodeURIComponent(path)}`
    );
  }

  readFile(path: string): Observable<FileInfo> {
    return this.http.get<FileInfo>(
      `${this.baseUrl}/files/read?path=${encodeURIComponent(path)}`
    );
  }

  tailFile(path: string, startLine: number): Observable<FileInfo> {
    return this.http.get<FileInfo>(
      `${this.baseUrl}/files/tail?path=${encodeURIComponent(
        path
      )}&startLine=${startLine}`
    );
  }
}
