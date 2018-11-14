import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { UsageDetail } from '../usage-detail.interface';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['usage.component.scss']
})
export class UsageComponent implements OnInit, OnDestroy {

  timeWindow$: Observable<{dateSpec: string; isAllTime: boolean}> = this.route.paramMap.pipe(
    map(pmap => pmap.get('date')),
    map(dateSpec => ({dateSpec, isAllTime: dateSpec.toLocaleLowerCase() === 'all'}))
  );
  accountId$: Observable<number> = of(12345);
  productId$: Observable<number> = of(3);


  rows$: Observable<[string, number][]>;

  constructor(public route: ActivatedRoute) {
    // console.log('UsageComponent.constructor()');
  }

  ngOnInit() {
    // console.log('UsageComponent.ngOnInit()');
      this.rows$ = this.timeWindow$.pipe(
        map(({dateSpec}) => {
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

    const usageDetails = [
      <UsageDetail>{dateUsage: 'Jan 18, 2018', accountId: 1, eventTime: 128231, usageId: 12821, usage: 15},
      <UsageDetail>{dateUsage: 'Jan 18, 2018', accountId: 2, eventTime: 128232, usageId: 12822, usage: 1235},
      <UsageDetail>{dateUsage: 'Jan 18, 2018', accountId: 3, eventTime: 128233, usageId: 12823, usage: 115},
      <UsageDetail>{dateUsage: 'Jan 18, 2018', accountId: 4, eventTime: 128234, usageId: 12821, usage: 15},
      <UsageDetail>{dateUsage: 'Jan 18, 2018', accountId: 5, eventTime: 128235, usageId: 12822, usage: 1235},
      <UsageDetail>{dateUsage: 'Jan 18, 2018', accountId: 6, eventTime: 128236, usageId: 12823, usage: 115},

      <UsageDetail>{dateUsage: 'Jan 19, 2018', accountId: 1, eventTime: 128234, usageId: 12824, usage: 153},
      <UsageDetail>{dateUsage: 'Jan 19, 2018', accountId: 2, eventTime: 128235, usageId: 12825, usage: 15322},
      <UsageDetail>{dateUsage: 'Jan 19, 2018', accountId: 3, eventTime: 128236, usageId: 12826, usage: 4145},
      <UsageDetail>{dateUsage: 'Jan 19, 2018', accountId: 4, eventTime: 128234, usageId: 12824, usage: 153},
      <UsageDetail>{dateUsage: 'Jan 19, 2018', accountId: 5, eventTime: 128235, usageId: 12825, usage: 15322},
      <UsageDetail>{dateUsage: 'Jan 19, 2018', accountId: 6, eventTime: 128236, usageId: 12826, usage: 4145},

      <UsageDetail>{dateUsage: 'Jan 20, 2018', accountId: 1, eventTime: 128237, usageId: 12827, usage: 945},
      <UsageDetail>{dateUsage: 'Jan 20, 2018', accountId: 2, eventTime: 128238, usageId: 12828, usage: 254},
      <UsageDetail>{dateUsage: 'Jan 20, 2018', accountId: 3, eventTime: 128239, usageId: 12829, usage: 53},
      <UsageDetail>{dateUsage: 'Jan 20, 2018', accountId: 4, eventTime: 128237, usageId: 12827, usage: 945},
      <UsageDetail>{dateUsage: 'Jan 20, 2018', accountId: 5, eventTime: 128238, usageId: 12828, usage: 254},
      <UsageDetail>{dateUsage: 'Jan 20, 2018', accountId: 6, eventTime: 128239, usageId: 12829, usage: 53},
    ];

    const rs = usageDetails.reduce(this.mode1Reducer, {});
    console.log('reduced result', rs);
  }

  ngOnDestroy() {
    console.log('UsageComponent.ngOnDestroy()');
  }

  /**
   * Account Type: Service Provider
   * Search Window: All time
   *
   * For each month, get summary of every customer's max usage of that month.
   * Assuming input event list being reduced only contains one max usage
   */
  mode1Reducer(acc, event: UsageDetail) {
    const {dateUsage, usage} = event;
    acc[dateUsage] = dateUsage in acc ? acc[dateUsage] + usage : usage;
    return acc;
  }

  /**
   * Account Type: Service Provider
   * Search Window: Specified Month
   *
   */
  mode3Reducer(acc, event: UsageDetail) {
    const {accountId, usage} = event;
    acc[accountId] = usage;
  }

  reduceByDateThenCalculateSummary2(acc, event: UsageDetail) {
    /*
     console.log('reducer', 'acc=>', JSON.stringify(acc), event);
     if (acc === undefined) {
     console.error('acc is undefined, initialize it');
     acc = {};
     }
     if ('usageId' in acc) {
     console.error('acc is event, initialize it');
     acc = {};
     }
     */
    const {dateUsage, usage, accountId} = event;
    const dateBuffer = acc[dateUsage] = dateUsage in acc ? acc[dateUsage] : {};
    const accountKey = `${accountId}`;
    const accountBuffer = dateBuffer[accountKey] = accountKey in dateBuffer ? dateBuffer[accountKey] : [];
    accountBuffer.push(event);
    return acc;
  }

}
