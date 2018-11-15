import { monthNames } from './constants';
// const moment = require('moment-timezone');

export class CommonFunction {
  public static isEmailValid(email): boolean {
    const regex = ['^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)',
      '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])',
      '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'].join('');
    const pattern = new RegExp(regex);
    return pattern.test(email);
  }

  /* Temporary solutions */
  public static getErrorMsg(value) {
    const errMsgString = 'Please check the ' + value + ' you were looking for,'
      + ' it may be incorrectly typed, deleted or insufficient permissions. '
      + ' We suggest going to <a href="#">' + value + 's and finding the '
      + value + '</a> there.';

    return errMsgString;
  }

  public static sortObjectsDesc(res: any, field: string) {
    if (res !== undefined && res !== null) {
      const sortedObjects = (res.sort(function (start, end) {
        return parseFloat(end[field]) - parseFloat(start[field]);
      }));
      return sortedObjects;
    } else {
      return res;
    }
  }

/*
  public static formatDateByLocale(date: Date): any {
    const locale = window.navigator.language;
    moment.locale(locale);
    const zoneName = moment().tz(moment.tz.guess()).format('z');
    const momentDate = moment(date);
    return momentDate;
  }

  public static getFullFormattedDateByLocale(date: Date): string {
    let formattedDate = '';
    const momentDate = this.formatDateByLocale(date);
    formattedDate += momentDate.format('lll');
    return formattedDate;
  }

  public static getDateFromFormattedDateByLocale(date: Date): string {
    let formattedDate = '';
    const momentDate = this.formatDateByLocale(date);
    formattedDate += momentDate.format('ll');
    return formattedDate;
  }

  public static getTimeFromFormattedDateByLocale(date: Date): string {
    let formattedDate = '';
    const momentDate = this.formatDateByLocale(date);
    formattedDate += momentDate.format('LT');
    return formattedDate;
  }
 */

  public static getMonthDescription(date: Date) {
    return monthNames[date.getMonth()] + ' ' + date.getFullYear();
  }

  public static setUrl(url: string, levels: number, defaultUrl: string) {
    if (url) {
      while (levels-- > 0 && url.lastIndexOf('/') > -1) {
        url = url.slice(0, url.lastIndexOf('/'));
      }
      return url;
    } else {
      return defaultUrl;
    }
  }
}

