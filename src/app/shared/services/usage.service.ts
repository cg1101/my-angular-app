import { Injectable } from '@angular/core';

import * as usageCount from '../../usage-detail/usage-count.json';
import * as usageDetails from '../../usage-detail/usage-details.json';

@Injectable({
  providedIn: 'root'
})
export class UsageService {
  getUsageCount(accountId, start, end, productId) {
    return Promise.resolve(usageCount);
  }

  getUsageDetails(accountId, productId, filter) {
    return Promise.resolve(usageDetails);
  }
}
