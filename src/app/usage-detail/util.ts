import { CommonFunction } from '../shared/common-function';
import { UsageDetail } from '../shared/models/usage-detail';
import { FilterTime } from '../shared/models/filter-time';

export const any_ = (acc, flag) => {
  return acc ? true : !!flag;
};

export const all = (acc, flag) => {
  return acc ? !!flag : false;
};

export const sum = (acc, value) => {
  return acc + value;
};

export const max = (acc, value) => {
  return Math.max(acc, value);
};

/**
 * return start and end time (as UNIX epoch time string) of input time filter
 * @param filter FilterTime instance to be parsed
 */
export const parseTimePair = (filter: FilterTime): {start: string; end: string} => {
  const t = filter.value.split(' ');
  return t.length >= 7 ?
    { start: t[2], end: t[6] } :
    { start: null, end: null };
};

/**
 * reduce usage detail events for service provider/all time
 * @param acc   accumulated result
 * @param event UsageDetail event
 */
export function mode1Reducer(acc, event: UsageDetail, index, events) {
  const { usage, eventTime, dateUsage, accountId } = event;
  const monthTag = CommonFunction.getMonthDescription(new Date(eventTime));
  const months = acc.months = acc.months || [];
  const byMonth = acc.byMonth = acc.byMonth || {};
  if (!(monthTag in byMonth)) {
    byMonth[monthTag] = {dates: [], byDate: {}};
    months.push(monthTag);
  }
  const perMonthByDate = byMonth[monthTag];
  if (!(dateUsage in perMonthByDate.byDate)) {
    perMonthByDate.dates.push(dateUsage);
    perMonthByDate.byDate[dateUsage] = {};
  }
  const perDateByAccountId = perMonthByDate.byDate[dateUsage];
  const usageOfDay = perDateByAccountId[accountId] || 0;
  perDateByAccountId[accountId] = Math.max(usageOfDay, +usage);

  if (index === events.length - 1) {
    const rows = months.map(month => {
      const thisMonth = acc.byMonth[month];
      const usagesOfAllDates = thisMonth.dates.map(thisDate => {
        const dailyUsageByAccountId = thisMonth.byDate[thisDate];
        const usageOfChildAccounts = Object.keys(dailyUsageByAccountId)
            .map(_accountId => dailyUsageByAccountId[_accountId]);
        const usageOfDate = usageOfChildAccounts.reduce(sum);
        return usageOfDate;
      });
      const maxUsageOfMonth = usagesOfAllDates.reduce(max);
      return {key: month, link: ['..', month.replace(' ', '-')], data: maxUsageOfMonth};
    });
    acc.rows = rows;
  }
  return acc;
};

export const mode2Reducer = mode1Reducer;

export const mode3Reducer = (acc, event: UsageDetail, index, events) => {
  const { accountId, usage } = event;
  const byAccountId = acc.byAccountId = acc.byAccountId ? acc.byAccountId : {};
  byAccountId[accountId] = Math.max((accountId in byAccountId ? byAccountId[accountId] : 0), +usage);
  if (index === events.length - 1) {
    const usages = Object.keys(byAccountId).map(key => {
      return {key: key, data: byAccountId[key]};
    });
    acc.rows = usages;
  }
  return acc;
};

export const mode4Reducer = (acc, event: UsageDetail, index, events) => {
  const { dateUsage, usage } = event;
  const byDate = acc.byDate = acc.byDate ? acc.byDate : {};
  byDate[dateUsage] = Math.max((dateUsage in byDate ? byDate[dateUsage] : 0), +usage);
  if (index === events.length - 1) {
    const usages = Object.keys(byDate).map(key => {
      return {key: key, data: byDate[key]};
    });
    acc.rows = usages;
  }
  return acc;
};
