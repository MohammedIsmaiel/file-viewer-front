import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectoryComponent } from './component/directory/directory.component';
import { FileComponent } from './component/file/file.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { basicAuthInterceptor } from './interceptor/basic-auth.interceptor';

@NgModule({
  declarations: [AppComponent, DirectoryComponent, FileComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideHttpClient(withInterceptors([basicAuthInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
