import { UsageDetail } from '../shared/models/usage-detail';
import * as util from './util';

import * as availableTimeFilters from './available-time-filters.json';
import * as usageDetails from './usage-details.json';

const x = usageDetails as any;

describe('util', () => {
  let arr1: any[];
  let arr2: any[];
  let arr3: any[];
  let events: UsageDetail[];

  beforeEach(() => {
    arr1 = [true, true, true];
    arr2 = [false, false, false];
    arr3 = [true, true, false];
    events = x as UsageDetail[];
  });

  it('any_', () => {
    expect(arr1.reduce(util.any_)).toEqual(true);
    expect(arr2.reduce(util.any_)).toEqual(false);
    expect(arr3.reduce(util.any_)).toEqual(true);
  });

  it('all', () => {
    expect(arr1.reduce(util.all)).toEqual(true);
    expect(arr2.reduce(util.all)).toEqual(false);
    expect(arr3.reduce(util.all)).toEqual(false);
  });

  it('sum', () => {
    arr1 = [1, 2, 3];
    arr2 = [-1, 0, 1];
    arr3 = [100, -200, 400];
    expect(arr1.reduce(util.sum)).toEqual(6);
    expect(arr2.reduce(util.sum)).toEqual(0);
    expect(arr3.reduce(util.sum)).toEqual(300);
  });

  it('max', () => {
    arr1 = [1, 2, 3];
    arr2 = [-1, 0, 1];
    arr3 = [100, -200, 400];
    expect(arr1.reduce(util.max)).toEqual(3);
    expect(arr2.reduce(util.max)).toEqual(1);
    expect(arr3.reduce(util.max)).toEqual(400);
  });

  it('parseTimePair', () => {
    let result: {start: string, end: string};
    result = util.parseTimePair(availableTimeFilters[0]);
    expect(result.start).toEqual('1540990800000');
    expect(result.end).toEqual('1543582800000');
    result = util.parseTimePair(availableTimeFilters[4]);
    expect(result.start).toBe(null);
    expect(result.end).toBe(null);
  });

  it('mode1Reducer', () => {
    const result = events.reduce(util.mode1Reducer, {}) as any;
    expect(result.months.length).toEqual(3);
  });

  it('mode3Reducer', () => {
    events = events.filter((event: UsageDetail) => {
      return /^Sep/.test(event.dateUsage);
    });
    const result = events.reduce(util.mode3Reducer, {}) as any;
    expect(result.rows.length).toEqual(2);
  });

  it('mode4Reducer', () => {
    events = events.filter((event: UsageDetail) => {
      return /^Nov/.test(event.dateUsage) && +event.accountId === 1530152095668;
    });
    const result = events.reduce(util.mode4Reducer, {}) as any;
    expect(result.rows.length).toEqual(6);
  });
});
