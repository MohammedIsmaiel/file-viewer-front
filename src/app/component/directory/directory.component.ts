import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSystemService } from '../../service/filesystemservice.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.css',
})
export class DirectoryComponent {
  path: string;
  files: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fileSystemService: FileSystemService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.path = params['path'] || '/';

      this.loadDirectory();
    });
  }

  loadDirectory(): void {
    this.fileSystemService.listDirectory(this.path).subscribe((data) => {
      this.files = data;
    });
  }

  openFile(file: any): void {
    if (this.path === '/') this.path = '';
    this.router.navigate(['/file'], {
      queryParams: { path: `${this.path}/${file.name}` },
    });
  }

  openDirectory(file: any): void {
    console.log(file);
    if (this.path === '/') this.path = '';
    // else this.path = this.path + file.name;
    // this.loadDirectory();
    this.router.navigate(['/directory'], {
      queryParams: { path: `${this.path}/${file.name}` },
    });
  }
  goBack(): void {
    this.router.navigate(['/directory'], {
      queryParams: { path: this.extractParentPath(this.path) },
    });
  }

  private extractParentPath(path: string): string {
    const segments = path.split('/');
    segments.pop(); // Remove the last segment (current file or directory)
    return segments.join('/');
  }
}
