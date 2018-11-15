export class Usage {
    productId: number;
    name: string;
    usage: number;
    available: number;
    url: string;
    detailsUrl: string;
}

export class UsageLabel {
    used: string;
    usedUnits: string;
    available: string;
    availableUnits: string;
    details: string;
}

export const PredefinedLabels: {[index: number]: UsageLabel} = {
    // UCA
    2: {
        used: 'Used this month',
        usedUnits: 'assessments',
        available: 'Available to use',
        availableUnits: 'assessments',
        details: 'Used'
    },
    // Skype for Business
    3: {
        used: 'Consumption',
        usedUnits: 'monitored users',
        available: 'Entitlement',
        availableUnits: 'monitored users',
        details: 'Consumption'
    },
    // Un-comment the below when CXM is usage is ready
    // "Customer Experience Management": {
    //     used: 'Users this month',
    //     usedUnits: 'users',
    //     available: 'Users available',
    //     availableUnits: 'users'
    // },
};
