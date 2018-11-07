import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AccountComponent } from './account/account.component';
import { UsageComponent } from './usage/usage.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
  {
    path: 'usage/:date',
    component: UsageComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    UsageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
