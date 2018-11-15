import { Injectable } from '@angular/core';

export class Account {

}

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {
  readonly contextAccountId = 1530152097890;
  isSp = true;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationModelService {
  workspace = {
    accountId: 1530152097890,
    subaccounts: {
      1535519604193: {
        name: 'ABC'
      },
      1530152095668: {
        name: 'DEF'
      }
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  getBreadcrumbs() {
    return [];
  }

  add(something) {

  }
}
