import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectoryComponent } from './component/directory/directory.component';
import { FileComponent } from './component/file/file.component';

const routes: Routes = [
  { path: '', redirectTo: '/directory', pathMatch: 'full' },
  { path: 'directory', component: DirectoryComponent },
  { path: 'file', component: FileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
