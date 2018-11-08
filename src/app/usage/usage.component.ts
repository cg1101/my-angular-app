import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { share, shareReplay } from 'rxjs/internal/operators';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css']
})
export class UsageComponent implements OnInit, OnDestroy {

  dateSpec$: Observable<string>;
  rows$: Observable<[string, number][]>;
  rows: [string, number][];

  constructor(public route: ActivatedRoute) {
    console.log('UsageComponent.constructor()');
    // console.log(`route is`, this.route);
    this.dateSpec$ = route.paramMap.pipe(
      map(p => p.get('date')),
    );
  }

  ngOnInit() {
    console.log('UsageComponent.ngOnInit()');
    this.rows$ = this.dateSpec$.pipe(
      map(dateSpec => {
        console.log('dataSpec changed =>', dateSpec)
        const rs = dateSpec === 'all' ? [
          ['JAN-2018', 150],
          ['FEB-2018', 200],
        ] : [
          ['customer 1', 100],
          ['customer 2', 200],
        ];
        return rs as [string, number][];
      }),
      share(),
    );
    this.rows$.subscribe(rows => {
      console.log('rows =>', rows);
    });
  }

  ngOnDestroy() {
    console.log('UsageComponent.ngOnDestroy()');
  }

}
