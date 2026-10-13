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
  engineSize: string,
  fuelType: string,
  transmission: string,
  colourPreference: string,
  accessories: string,
  vehicleAdditionalInfo: string,
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
    engineSize: null,
    fuelType: null,
    transmission: null,
    colourPreference: '',
    accessories: [],
    additionalInfo: ''
  },
  requirements: {
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
export interface BasicDetails {
  companyName: string,
  department: string,
  requestingEmployee: string,
  contactNumber: string,
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
  engineSize: string | null,
  fuelType: string | null,
  transmission: string | null,
  colourPreference: string,
  accessories: string[],
  additionalInfo: string
}
export interface OperationalRequirements {
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