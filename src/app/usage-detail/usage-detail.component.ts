import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { combineLatest } from 'rxjs';
import { from } from 'rxjs';
import {
  catchError, delay, distinctUntilChanged, filter, finalize,
  map, share, shareReplay, switchMap, takeUntil, withLatestFrom
} from 'rxjs/operators';

import { ServiceProviderService, ApplicationModelService, BreadcrumbService } from './@ir';
import { Account } from './@ir';

import { uccProductId } from '../shared/constants';
import { FilterTime } from '../shared/models/filter-time';
import { Usage } from '../shared/models/usage';
import { UsageDetail } from '../shared/models/usage-detail';
import { SubscriptionsService } from '../shared/services/subscriptions.service';
import { UsageService } from '../shared/services/usage.service';
import { any_, mode1Reducer, mode2Reducer, mode3Reducer, mode4Reducer, parseTimePair } from './util';

@Component({
  styleUrls: ['./usage-detail.component.scss'],
  templateUrl: './usage-detail.component.html'
})
export class UsageDetailComponent implements OnInit, OnDestroy {

  readonly reducerMap = {
    1: mode1Reducer,
    2: mode2Reducer,
    3: mode3Reducer,
    4: mode4Reducer,
  };

  title = 'UC Cloud usage';
  errorMessage$ = new BehaviorSubject<string>('');

  pageContext$: Observable<{
    dateSpec: string;
    dateSpecLabel: string;
    isAllTime: boolean;
    accountId: number;
    productId: number;
    isServiceProvider: boolean;
    mode: number;
    accountNameById: {
      [accountId: number]: Account
    };
  }>;

  availableTimeFilters$: Observable<FilterTime[]>;
  timeFilterInUse$: Observable<FilterTime>;

  usageCount$: Observable<Usage[]>;
  usageDetails$: Observable<UsageDetail[]>;
  summaryContext$: Observable<{
    showEntitlement: boolean;
    usage: number;
    entitlement?: number;
    timeCategory: string;
  }>;
  rows$: Observable<any[]>;

  busyFlagTimeFilters$ = new BehaviorSubject<boolean>(false);
  busyFlagUsageCount$ = new BehaviorSubject<boolean>(false);
  busyFlagUsageDetails$ = new BehaviorSubject<boolean>(false);
  isBusy$: Observable<boolean>;

  protected shouldStop$ = new Subject<void>();

  constructor(protected serviceProviderService: ServiceProviderService,
    protected subscriptionService: SubscriptionsService,
    protected usageService: UsageService,
    protected breadcrumbService: BreadcrumbService,
    protected appModel: ApplicationModelService,
    protected route: ActivatedRoute,
    protected router: Router,
  ) { }

  ngOnInit() {
    const params$ = this.pageContext$ = this.route.paramMap.pipe(
      map((pmap: ParamMap) => {
        const dateSpec = pmap.get('date');
        const dateSpecLabel = dateSpec.replace('-', ' ');
        const isAllTime = dateSpec.toLocaleLowerCase() === 'all';
        const accountId = this.serviceProviderService.contextAccountId;
        const productId = uccProductId;
        const isServiceProvider = this.serviceProviderService.contextAccountId ===
            this.appModel.workspace.accountId && this.serviceProviderService.isSp;
        const mode = isServiceProvider ? (isAllTime ? 1 : 3) : (isAllTime ? 2 : 4);
        const subaccounts = this.appModel.workspace.subaccounts;
        const accountNameById = {};
        Object.keys(subaccounts).forEach(_accountId => {
          const account = subaccounts[_accountId];
          accountNameById[account.accountId] = account.name;
        });
        return {
          dateSpec, dateSpecLabel, isAllTime, accountId, productId,
          isServiceProvider, mode, accountNameById,
        };
      }),
      distinctUntilChanged(),
      takeUntil(this.shouldStop$),
      shareReplay(1),  // only initialize once each time source emits
    );

    params$.subscribe(({ dateSpecLabel, isAllTime }) => {
      if (!isAllTime) {
        const segments = this.router.url.split('/');
        segments.pop();
        segments.push('all');
        const url = segments.join('/');
        const breadcrumb = this.breadcrumbService.getBreadcrumbs();
        const length = breadcrumb.length;
        breadcrumb[length - 1].url = url;
        this.breadcrumbService.add({ name: dateSpecLabel });
      }
    });

    this.availableTimeFilters$ = params$.pipe(
      switchMap(({ productId, accountId }) => {
        // console.log('loading availableTimeFilters ...');
        this.busyFlagTimeFilters$.next(true);
        this.errorMessage$.next('');
        return from(this.subscriptionService
          .getFilterTimeBasedOnSubsciptionsDate(accountId, productId)).pipe(
            catchError(err => {
              console.error(`error loading time filters for account ${accountId}`, err);
              this.errorMessage$.next(`${err}`);
              return [];
            }),
            finalize(() => this.busyFlagTimeFilters$.next(false)),
          );
      }),
      share(),
    );

    this.timeFilterInUse$ = this.availableTimeFilters$.pipe(
      filter((availableTimeFilters: FilterTime[]) => availableTimeFilters.length > 0),
      withLatestFrom(params$),
      map(([availableTimeFilters, {dateSpecLabel}]) => {
        const filter = availableTimeFilters.find(f => dateSpecLabel === f.name);
        return filter ? filter : availableTimeFilters[availableTimeFilters.length - 1];
      }),
      share(),
    );

    this.usageCount$ = this.timeFilterInUse$.pipe(
      map(parseTimePair),
      withLatestFrom(params$),
      switchMap(([{ start, end }, {accountId, productId}]) => {
        // console.log(`loading usageCount ...`);
        this.busyFlagUsageCount$.next(true);
        return from(this.usageService.getUsageCount(accountId, start, end, productId)).pipe(
          catchError(err => {
            console.error(`error loading usage count for ${accountId}`, err);
            this.errorMessage$.next(`${err}`);
            return [];
          }),
          finalize(() => this.busyFlagUsageCount$.next(false)),
        );
      }),
      share(),
    );

    this.usageDetails$ = this.timeFilterInUse$.pipe(
      withLatestFrom(params$),
      switchMap(([filter, {accountId, productId}]) => {
        // console.log(`loading usageDetailsReady ...`);
        this.busyFlagUsageDetails$.next(true);
        return from(this.usageService.getUsageDetails(accountId, productId, filter.value)).pipe(
          catchError(err => {
            console.error(`error loading usage details for ${accountId}`, err);
            this.errorMessage$.next(`${err}`);
            return [];
          }),
          finalize(() => this.busyFlagUsageDetails$.next(false)),
        );
      }),
      share(),
    );

    this.summaryContext$ = combineLatest(this.usageCount$, params$, this.timeFilterInUse$).pipe(
      map(([usageCountArray, {isServiceProvider}, timeFilterInUse]) => ({
        showEntitlement: isServiceProvider,
        usage: usageCountArray[0].usage,
        entitlement: usageCountArray[0].available,
        timeCategory: timeFilterInUse.category,
      })),
      share(),
    );

    this.rows$ = this.usageDetails$.pipe(
      map((events: UsageDetail[]) => events.sort((eventA, eventB) => (+eventB.eventTime - +eventA.eventTime))),
      withLatestFrom(params$),
      map(([events, {dateSpec, accountNameById, mode}]) => {
        const reducer = this.reducerMap[mode];
        const result = events.reduce(reducer, {}) as any;
        const rows = result.rows;
        if (mode === 3) {
          rows.map(row => {
            const accountId = row.key;
            row.key = accountNameById[row.key];
            row.link = `/${accountId}/account/new-usage/details/ucc/${dateSpec}`;
          });
          rows.sort((a, b) => a.key.localeCompare(b.key));
        }
        return rows;
      }),
    );

    this.isBusy$ = combineLatest(this.busyFlagTimeFilters$,
      this.busyFlagUsageCount$, this.busyFlagUsageDetails$).pipe(
        map((flags: boolean[]) => flags.reduce(any_)),
        distinctUntilChanged(),
        delay(0),
        takeUntil(this.shouldStop$),
      );
  }

  ngOnDestroy() {
    this.shouldStop$.next();
    this.shouldStop$.complete();
  }

  onChartMessage($event) {
    console.log('onChartMessage()', $event, 'router->', this.router, '<-');
    const segments = this.router.url.split('/');
    segments[segments.length - 1] = $event;
    const url = segments.join('/');
    console.log('segments', segments);
    console.log('now navigate to url', url);
    this.router.navigateByUrl(url);
  }
}
