export const ucaProductId = 2;
export const uccProductId = 3;
export const cxmProductId = 4;

export const productInformation = {
  [ucaProductId]: {
    name: 'UC Assessor',
    shortName: 'UCA',
    description: 'Assess the readiness of your business for Cloud UC applications.'
  },
  [uccProductId]: {
    name: 'UC Cloud',
    shortName: 'UCC',
    description: 'Troubleshoot and get better visibility into meeting and call quality issues'
  },
  [cxmProductId]: {
    name: 'Experience Monitoring',
    shortName: 'XM',
    description: 'Feature and monitor tests on any communications system'
  },
};

export const ucaProductName = productInformation[ucaProductId].name;
export const uccProductName = productInformation[uccProductId].name;

export const usageDetailsDescription = 'This assessment originally started on ';

export const eventDescAssessmentExtended = 'assessmentExtended';

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
