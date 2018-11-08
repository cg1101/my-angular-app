import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  accountId$: Observable<string> = this.route.paramMap.pipe(
    map(pmap => pmap.get('accountId')),
  );

  products$: Observable<any> = this.accountId$.pipe(
    map(accountId => {
      if (+accountId > 1) {
        return ['ucc', 'uca'];
      } else {
        return ['ucc'];
      }
    }),
  );

  isSp$: Observable<boolean> = this.accountId$.pipe(
    map(accountId => !!(+accountId % 2)),
  );

  constructor(protected route: ActivatedRoute) {
    console.log('AccountComponent.constructor()');
  }

  ngOnInit() {
    console.log('AccountComponent.ngOnInit()');
  }

  ngOnDestroy() {
    console.log(`AccountComponent.ngOnDestroy()`);
  }


}
