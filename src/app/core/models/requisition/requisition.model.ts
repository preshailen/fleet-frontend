export interface RequisitionModel {
  basicDetails: BasicDetails,
  purpose: Purpose,
  typeOfAgreement: TypeOfAgreement,
  specifications: VehicleSpecifications,
  requirements: OperationalRequirements,
  financialInfo: FinancialInformation,
  complianceInfo: ComplianceInformation
}
export interface Requisition {
  companyName: string,
  department: string,
  requestingEmployee: string,
  contactNumber: string,
  contactEmail: string,
  supplierEmail: string,
  nameOfDriverAssigned: string,
  basicAdditionalInfo: string,
  purpose: string,
  type: string,
  term: number | null,
  vehicleType: string,
  make: string,
  model: string,
  engineSize: string,
  fuelType: string,
  transmission: string,
  colourPreference: string,
  accessories: string,
  vehicleAdditionalInfo: string,
  intendedUse: string,
  estimatedMonthlyKms: number | null,
  costCentre: string,
  budgetAvailable: number | null,
  estimatedVehicleCost: number | null,
  insurance: boolean,
  vehicleTracking: boolean,
  roadworthy: boolean,
  licensingAndRegistration: boolean,
  fulfillmentDate: Date | null,
  status: String | null 
}
export const EMPTY_MODEL = {
  basicDetails: {
    companyName: '',
    department: '',
    requestingEmployee: '',
    contactNumber: '',
    contactEmail: '',
    supplierEmail: '',
    nameOfDriverAssigned: '',
    additionalInfo: ''
  },
  purpose: {
    purpose: ''
  },
  typeOfAgreement: {
    type: '',
    term: null
  },
  specifications: {
    vehicleType: '',
    make: '',
    model: '',
    engineSize: '',
    fuelType: '',
    transmission: '',
    colourPreference: '',
    accessories: [],
    additionalInfo: ''
  },
  requirements: {
    intendedUse: '',
    estimatedMonthlyKms: null
  },
  financialInfo: {
    costCentre: '',
    budgetAvailable: null,
    estimatedVehicleCost: null,
  },
  complianceInfo: {
    insurance: null,
    vehicleTracking: null,
    roadworthy: null,
    licensingAndRegistration: null
  }
}
export const FULL_MODEL = {
  basicDetails: {
    companyName: 'GoogleGoogleGoogleGoogleGoogleGoogleGoogleGoogleGoogleGoogleGoovvvgleGoogleGoogleGoogleGoogleGoogleG',
    department: 'ITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITITIT',
    requestingEmployee: 'PreshailenPreshailenPreshailenPreshailenPreshailenPreshailenPreshailenPreshailenPreshailenPreshailen',
    contactNumber: '22222222222222222222',
    contactEmail: 'ruthnampresh@gmail.com',
    supplierEmail: 'pdfootballpod@gmail.com',
    nameOfDriverAssigned: 'MervinMervinMervinMervinMervinMervinMervinMervinMervinMervinMervinMervinMervinMervinMervinMervinMerv',
    additionalInfo: 'AdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInf'
  },
  purpose: {
    purpose: 'New Vehicle'
  },
  typeOfAgreement: {
    type: 'Operating Lease with maintenance',
    term: 600
  },
  specifications: {
    vehicleType: 'VehicleType VehicleType VehicleType VehicleType VehicleType VehicleType VehicleType VehicleTypeVehic',
    make: 'VehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeV',
    model: 'VehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeV',
    engineSize: 'VehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeV',
    fuelType: 'VehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeV',
    transmission: 'VehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeV',
    colourPreference: 'VehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeVehicleMakeV',
    accessories: [],
    additionalInfo: 'AdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInformationAdditionalInf'
  },
  requirements: {
    intendedUse: 'IntendedUseIntendedUseIntendedUseIntendedUseIntendedUseIntendedUseIntendedUseIntendedUseIntendedUseI',
    estimatedMonthlyKms: 100000
  },
  financialInfo: {
    costCentre: 'CostCentreCostCentreCostCentreCostCentreCostCentreCostCentreCostCentreCostCentreCostCentreCostCentre',
    budgetAvailable: 10000000,
    estimatedVehicleCost: 10000000,
  },
  complianceInfo: {
    insurance: 'false',
    vehicleTracking: 'false',
    roadworthy: 'false',
    licensingAndRegistration: 'false'
  }
}
export interface BasicDetails {
  companyName: string,
  department: string,
  requestingEmployee: string,
  contactNumber: string,
  contactEmail: string,
  supplierEmail: string,
  nameOfDriverAssigned: string,
  additionalInfo: string
}
export interface Purpose {
  purpose: string,
}
export interface TypeOfAgreement {
  type: string,
  term: number | null
}
export interface VehicleSpecifications {
  vehicleType: string,
  make: string,
  model: string,
  engineSize: string,
  fuelType: string,
  transmission: string,
  colourPreference: string,
  accessories: string[],
  additionalInfo: string
}
export interface OperationalRequirements {
  intendedUse: string,
  estimatedMonthlyKms: number | null
}
export interface FinancialInformation {
  costCentre: string,
  budgetAvailable: number | null,
  estimatedVehicleCost: number | null,
}
export interface ComplianceInformation {
  insurance: string | null,
  vehicleTracking: string | null,
  roadworthy: string | null,
  licensingAndRegistration: string | null
}