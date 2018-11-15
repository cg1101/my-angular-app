import { ProductDetails } from './product-details';

export class UsageDetail {
    accountId: string;
    usageId: string;
    eventDescription: string;
    usage: string;
    productId: string;
    productDetails: ProductDetails;
    eventTime: string;
    dateUsage: string;
    timeUsage: string;
    link: string;
}
