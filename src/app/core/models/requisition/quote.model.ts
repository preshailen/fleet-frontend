export interface Quote {
  summary: SummarySupplier,
  evaluation: TechnicalCompliance,
  commercial: CommercialEvaluation,
  pdf: PDF,
}

export interface SummarySupplier {
  unitPrice: number,
  deliveryLeadTime: string,
  warranty: string
}
export interface TechnicalCompliance {
  engineCapacity: string | null,			
  fuelType: string | null,			
  transmission: string | null,
  safetyFeatures: string,
  additionalAccessories: string[],
  efficiency: number,			
  additionalInformation: string
}
export interface CommercialEvaluation {
  vehicleRetailPrice: number,			
  deliveryCosts: number,
  optionalExtras: string,
  otherCosts: number,
  totalCosts: number 
}
export interface PDF {
  file: File | null;
  touched: boolean;
  duplicate: boolean;
  isPdf: boolean;
  tooBig: boolean;
}

export const  EMPTY_QUOTE_MODEL: Quote = {
  summary: {
    unitPrice: 0,
    deliveryLeadTime: '',
    warranty: ''
  },
  evaluation: {
    engineCapacity: null,
    fuelType: null,
    transmission: null,
    safetyFeatures: '',
    additionalAccessories: [],
    efficiency: 0,
    additionalInformation: ''
  },
  commercial: {
    vehicleRetailPrice: 0,
    deliveryCosts: 0,
    optionalExtras: '',
    otherCosts: 0,
    totalCosts: 0
  },
  pdf: {
    file: null,
    touched: false,
    duplicate: false,
    isPdf: false,
    tooBig: false
  }
};

export const  FULL_QUOTE_MODEL: Quote = {
  summary: {
    unitPrice: 23,
    deliveryLeadTime: 'sd',
    warranty: 'sd'
  },
  evaluation: {
    engineCapacity: '1600',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    safetyFeatures: 'sd',
    additionalAccessories: [],
    efficiency: 34,
    additionalInformation: ''
  },
  commercial: {
    vehicleRetailPrice: 12,
    deliveryCosts: 12,
    optionalExtras: '',
    otherCosts: 12,
    totalCosts: 12
  },
  pdf: {
    file: null,
    touched: false,
    duplicate: false,
    isPdf: false,
    tooBig: false
  }
};