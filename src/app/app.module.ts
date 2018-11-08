import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AccountComponent } from './account/account.component';
import { UsageComponent } from './usage/usage.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':accountId/account',
        children: [
          {
            path: '',
            component: AccountComponent
          },
          {
            path: 'usage/details/:product/:date',
            component: UsageComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    UsageComponent,
    HomeComponent,
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
