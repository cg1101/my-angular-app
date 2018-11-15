// import { AccountsMap } from '@ir/ui-components/dist';
import { Product } from './product';

type AccountsMap = any;

export class Account {
    accountId: number;
    name: string;
    type?: string;
    subaccounts?: AccountsMap;
    products?: Product[];
    roles?: number[];
}
