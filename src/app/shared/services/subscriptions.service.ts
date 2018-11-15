import { Injectable } from '@angular/core';
import * as availableTimeFilters from '../../usage-detail/available-time-filters.json';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  getFilterTimeBasedOnSubsciptionsDate(accountId, productId) {
    return Promise.resolve(availableTimeFilters);
  }
}
