import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AccountComponent } from './account/account.component';
import { UsageComponent } from './usage/usage.component';
import { HomeComponent } from './home/home.component';
import { UsageDetailComponent } from './usage-detail/usage-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: ':accountId/account',
        children: [
          {
            path: '',
            component: AccountComponent
          },
          {
            path: 'usage/details/:product/:date',
            component: UsageDetailComponent
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
    UsageDetailComponent,
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
