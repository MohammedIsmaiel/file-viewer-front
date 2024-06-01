import { Component } from '@angular/core';
import { FileSystemService } from '../../service/filesystemservice.service';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrl: './file.component.css',
})
export class FileComponent {
  path: string;
  fileContent: string | undefined;
  lastLine: number | undefined;
  tailing: boolean = false;
  tailSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fileSystemService: FileSystemService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.path = params['path'];
      this.loadFile();
    });
  }

  ngOnDestroy(): void {
    this.stopTailing();
  }

  loadFile(): void {
    this.fileSystemService.readFile(this.path).subscribe((data) => {
      this.fileContent = data.content;
      this.lastLine = data.lastLine;
    });
  }

  startTailing(): void {
    this.tailing = true;
    this.tailSubscription = interval(5000).subscribe(() => {
      this.fileSystemService
        .tailFile(this.path, this.lastLine == undefined ? 0 : this.lastLine)
        .subscribe((data) => {
          console.log(data);
          if (data.lastLine && this.lastLine && data.lastLine > this.lastLine) {
            this.fileContent += '\n' + data.content;
            this.lastLine = data.lastLine;
          }
        });
    });
  }

  stopTailing(): void {
    this.tailing = false;
    if (this.tailSubscription) {
      this.tailSubscription.unsubscribe();
    }
  }
  goBack(): void {
    this.stopTailing();
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
