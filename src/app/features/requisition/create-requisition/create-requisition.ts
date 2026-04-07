import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { applyEach, form, max, maxLength, min, required, validate } from '@angular/forms/signals';
import { NgWizardConfig, NgWizardService, StepChangedArgs, THEME } from 'ng-wizard';
import { EMPTY_MODEL, Requisition, RequisitionModel } from '../../../core/models/requisition/requisition.model';
import { HelpersService } from '../../../core/services/helpers.service';
import { SharedModule } from '../../../theme/shared/shared.module';
import { BasicDetails } from "./basic-details/basic-details";
import { Purpose } from './purpose/purpose';
import { TypeOfAgreement } from './type-of-agreement/type-of-agreement';
import { ValidatorService } from '../../../core/services/validator.service';
import { Specifications } from './specifications/specifications';
import { OperationalRequirements } from './operational-requirements/operational-requirements';
import { FinancialInformation } from './financial-information/financial-information';
import { ComplianceInformation } from './compliance-information/compliance-information';
import { AlertService } from '../../../core/services/alert.service';
import { RequisitionService } from '../../../core/services/requisition.service';
import { DeactivatableComponent } from '../../../core/guards/leave.guard';


@Component({
  selector: 'app-create-requisition',
  imports: [SharedModule, BasicDetails, Purpose, TypeOfAgreement, Specifications,
            ComplianceInformation, OperationalRequirements, FinancialInformation ],
  templateUrl: './create-requisition.html',
  styleUrl: './create-requisition.scss',
})
export class CreateRequisition implements DeactivatableComponent {
  public helperService = inject(HelpersService);
  private validatorService = inject(ValidatorService);
  private alertService = inject(AlertService);
  private requisitionService = inject(RequisitionService);
  private wizard = inject(NgWizardService);
  public requisitionModel = signal<RequisitionModel>(EMPTY_MODEL);
  basicDetails = viewChild(BasicDetails);
  purpose = viewChild(Purpose);
  typeofAgreement = viewChild(TypeOfAgreement);
  specifications = viewChild(Specifications);
  complianceInformation = viewChild(ComplianceInformation);
  operationalRequirements = viewChild(OperationalRequirements);
  financialInformation = viewChild(FinancialInformation);
  changed = signal(false);
  requisitionForm = form(this.requisitionModel, (schemaPath) => {
    required(schemaPath.basicDetails.companyName, { message: 'Company Name is required' });
    validate(schemaPath.basicDetails.companyName, this.validatorService.maxLengthValidator({ max: 100, message: 'Company Name must be at most 100 characters' }));
    validate(schemaPath.basicDetails.companyName, this.validatorService.emptyValidator());
    required(schemaPath.basicDetails.department, { message: 'Department is required' });
    validate(schemaPath.basicDetails.department, this.validatorService.maxLengthValidator({ max: 100, message: 'Department must be at most 100 characters' }));
    validate(schemaPath.basicDetails.department, this.validatorService.emptyValidator());
    required(schemaPath.basicDetails.requestingEmployee, { message: "Requesting Employee's Name is required" });
    validate(schemaPath.basicDetails.requestingEmployee, this.validatorService.maxLengthValidator({ max: 100, message: "Requesting Employee's Name must be at most 100 characters" }));
    validate(schemaPath.basicDetails.requestingEmployee, this.validatorService.emptyValidator());
    required(schemaPath.basicDetails.contactNumber, { message: 'Contact Number is required' });
    validate(schemaPath.basicDetails.contactNumber, this.validatorService.telephoneValidator());
    validate(schemaPath.basicDetails.contactNumber, this.validatorService.emptyValidator());
    required(schemaPath.basicDetails.contactEmail, { message: "Requesting Employee's Email is required" });
    validate(schemaPath.basicDetails.contactEmail, this.validatorService.emailValidator())
    validate(schemaPath.basicDetails.contactEmail, this.validatorService.maxLengthValidator({ max: 100, message: "Requesting Employee's Email must be at most 100 characters" }));
    validate(schemaPath.basicDetails.contactEmail, this.validatorService.emptyValidator());
    required(schemaPath.basicDetails.supplierEmail, { message: "Suppliers Email is required" });
    validate(schemaPath.basicDetails.supplierEmail, this.validatorService.emailValidator())
    validate(schemaPath.basicDetails.supplierEmail, this.validatorService.maxLengthValidator({ max: 100, message: "Suppliers Email must be at most 100 characters" }));
    validate(schemaPath.basicDetails.supplierEmail, this.validatorService.emptyValidator());
    required(schemaPath.basicDetails.nameOfDriverAssigned, { message: 'Name of Driver Assigned is required' });
    validate(schemaPath.basicDetails.nameOfDriverAssigned, this.validatorService.maxLengthValidator({ max: 100, message: 'Name of Assigned Driver must be at most 100 characters' }));
    validate(schemaPath.basicDetails.nameOfDriverAssigned, this.validatorService.emptyValidator());
    validate(schemaPath.basicDetails.additionalInfo, this.validatorService.maxLengthValidator({ max: 1000, message: 'Additional info must be at most 1000 characters' }));
    validate(schemaPath.basicDetails.additionalInfo, this.validatorService.emptyValidator());
    
    required(schemaPath.purpose.purpose, { message: 'Purpose is required' });

    required(schemaPath.typeOfAgreement.type, { message: 'Type of Agreement is required' });
    required(schemaPath.typeOfAgreement.term,  { message: 'Term is required', when: () => this.requisitionModel().typeOfAgreement.type === 'Operating Lease with maintenance' });
    min(schemaPath.typeOfAgreement.term, 1, { message: 'Term must be 1 month or more' });
    max(schemaPath.typeOfAgreement.term, 600, { message: 'Term must be 600 or less' });

    required(schemaPath.specifications.vehicleType, { message: 'Vehicle Type is required'});
    validate(schemaPath.specifications.vehicleType, this.validatorService.maxLengthValidator({ max: 100, message: 'Vehicle Type must be at most 100 characters' }));
    validate(schemaPath.specifications.vehicleType, this.validatorService.emptyValidator());
    required(schemaPath.specifications.make, { message: 'Vehicle Make is required'});
    validate(schemaPath.specifications.make, this.validatorService.maxLengthValidator({ max: 100, message: 'Vehicle Make must be at most 100 characters' }));
    validate(schemaPath.specifications.make, this.validatorService.emptyValidator());
    required(schemaPath.specifications.model, { message: 'Vehicle Model is required'});
    validate(schemaPath.specifications.model, this.validatorService.maxLengthValidator({ max: 100, message: 'Vehicle Model must be at most 100 characters' }));
    validate(schemaPath.specifications.model, this.validatorService.emptyValidator());
    required(schemaPath.specifications.engineSize, { message: 'Engine Size is required'});
    validate(schemaPath.specifications.engineSize, this.validatorService.maxLengthValidator({ max: 100, message: 'Engine Size must be at most 100 characters' }));
    validate(schemaPath.specifications.engineSize, this.validatorService.emptyValidator());
    required(schemaPath.specifications.fuelType, { message: 'Fuel Type is required'});
    validate(schemaPath.specifications.fuelType, this.validatorService.maxLengthValidator({ max: 100, message: 'Fuel Type must be at most 100 characters' }));
    validate(schemaPath.specifications.fuelType, this.validatorService.emptyValidator());
    required(schemaPath.specifications.transmission, { message: 'Transmission is required'});
    validate(schemaPath.specifications.transmission, this.validatorService.maxLengthValidator({ max: 100, message: 'Transmission must be at most 100 characters' }));
    validate(schemaPath.specifications.transmission, this.validatorService.emptyValidator());
    required(schemaPath.specifications.colourPreference, { message: 'Colour Preference is required'});
    validate(schemaPath.specifications.colourPreference, this.validatorService.maxLengthValidator({ max: 100, message: 'Colour Preference must be at most 100 characters' }));
    validate(schemaPath.specifications.colourPreference, this.validatorService.emptyValidator());
    maxLength(schemaPath.specifications.accessories, 10, { message: 'A maximum of 10 accessories are allowed'});
    applyEach(schemaPath.specifications.accessories, (accessoryPath) => {
      validate(accessoryPath, this.validatorService.maxLengthValidator({ max: 100, message: 'Accessory must be at most 100 characters' }));
    })
    validate(schemaPath.specifications.additionalInfo, this.validatorService.maxLengthValidator({ max: 1000, message: 'Additional info must be at most 1000 characters' }));
    validate(schemaPath.specifications.additionalInfo, this.validatorService.emptyValidator());

    required(schemaPath.requirements.intendedUse, { message: 'Intended Use is required'});
    validate(schemaPath.requirements.intendedUse, this.validatorService.maxLengthValidator({ max: 100, message: 'Intended Use must be at most 100 characters' }));
    validate(schemaPath.requirements.intendedUse, this.validatorService.emptyValidator());
    required(schemaPath.requirements.estimatedMonthlyKms, { message: 'Estimated Monthly Kms are required'})
    min(schemaPath.requirements.estimatedMonthlyKms, 1, { message: 'Estimated Monthly Kms must be 1 or more' });
    max(schemaPath.requirements.estimatedMonthlyKms, 100000, { message: 'Estimated Monthly Kms must be 100000 or less' });

    required(schemaPath.financialInfo.costCentre, { message: 'Cost Centre is required'});
    validate(schemaPath.financialInfo.costCentre, this.validatorService.maxLengthValidator({ max: 100, message: 'Cost Centre must be at most 100 characters' }));
    validate(schemaPath.financialInfo.costCentre, this.validatorService.emptyValidator());
    required(schemaPath.financialInfo.budgetAvailable, { message: 'Budget Available is required'})
    min(schemaPath.financialInfo.budgetAvailable, 1, { message: 'Budget Available must be 1 or more' });
    max(schemaPath.financialInfo.budgetAvailable, 10000000, { message: 'Budget Available must be 10000000 or less' });
    required(schemaPath.financialInfo.estimatedVehicleCost, { message: 'Estimated Vehicle Cost is required'})
    min(schemaPath.financialInfo.estimatedVehicleCost, 1, { message: 'Estimated Vehicle Cost must be 1 or more' });
    max(schemaPath.financialInfo.estimatedVehicleCost, 10000000, { message: 'Estimated Vehicle Cost must be 10000000 or less' });

    required(schemaPath.complianceInfo.insurance, { message: 'Insurance required is required'});
    required(schemaPath.complianceInfo.vehicleTracking, { message: 'Vehicle Tracking required is required'});
    required(schemaPath.complianceInfo.roadworthy, { message: 'Roadworthy required is required'});
    required(schemaPath.complianceInfo.licensingAndRegistration, { message: 'Licensing and Registration required is required'});
  });
  initialValue = JSON.stringify(this.requisitionModel());
  config: NgWizardConfig = {
    theme: THEME.circles,
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false
    },
    anchorSettings: {
      anchorClickable: false
    }
  };

  constructor() {
    effect(() => {
      if (this.initialValue !== JSON.stringify(this.requisitionModel())) {
        this.changed.set(true);
      } else {
        this.changed.set(false);
      }
    })
  }
  stepChanged(step: StepChangedArgs) {
    //console.log(step);
  }
  previous() {
    this.wizard.previous();
  }
  next() {
    this.wizard.next();
  }
  changeEmail(email: string) {
    this.requisitionModel.update(m => ({ ...m,
      basicDetails: {
        ...m.basicDetails,
        contactEmail: email
      }
    }));
  }
  async create() {
    if (!this.requisitionForm().invalid()) {
      try {
        if (await this.alertService.confirm('Confirm', 'Are you ready to create Requisition?', 'Confirm')) {
          const model: Requisition = {
            companyName: this.requisitionModel().basicDetails.companyName,
            department: this.requisitionModel().basicDetails.department,
            requestingEmployee: this.requisitionModel().basicDetails.requestingEmployee,
            contactNumber: this.requisitionModel().basicDetails.contactNumber,
            contactEmail: this.requisitionModel().basicDetails.contactEmail,
            supplierEmail: this.requisitionModel().basicDetails.supplierEmail,
            nameOfDriverAssigned: this.requisitionModel().basicDetails.nameOfDriverAssigned,
            basicAdditionalInfo: this.requisitionModel().basicDetails.additionalInfo,
            purpose: this.requisitionModel().purpose.purpose,
            type: this.requisitionModel().typeOfAgreement.type,
            term: this.requisitionModel().typeOfAgreement.term,
            vehicleType: this.requisitionModel().specifications.vehicleType,
            make: this.requisitionModel().specifications.make,
            model: this.requisitionModel().specifications.model,
            engineSize: this.requisitionModel().specifications.engineSize,
            fuelType: this.requisitionModel().specifications.fuelType,
            transmission: this.requisitionModel().specifications.transmission,
            colourPreference: this.requisitionModel().specifications.colourPreference,
            accessories: this.turnArrayIntoList(this.requisitionModel().specifications.accessories),
            vehicleAdditionalInfo: this.requisitionModel().specifications.additionalInfo,
            intendedUse: this.requisitionModel().requirements.intendedUse,
            estimatedMonthlyKms: this.requisitionModel().requirements.estimatedMonthlyKms,
            costCentre: this.requisitionModel().financialInfo.costCentre,
            budgetAvailable: this.requisitionModel().financialInfo.budgetAvailable,
            estimatedVehicleCost: this.requisitionModel().financialInfo.estimatedVehicleCost,
            insurance: this.getBoolean(this.requisitionModel().complianceInfo.insurance),
            vehicleTracking: this.getBoolean(this.requisitionModel().complianceInfo.vehicleTracking),
            roadworthy: this.getBoolean(this.requisitionModel().complianceInfo.roadworthy),
            licensingAndRegistration: this.getBoolean(this.requisitionModel().complianceInfo.licensingAndRegistration),
            fulfillmentDate: null,
            status: 'submitted'
          };
          if (await this.alertService.load(this.requisitionService.createRequisition(model))) {
            this.alertService.success('Requisition Created!');
            this.requisitionModel.set(EMPTY_MODEL);
            this.requisitionForm().reset();
            this.wizard.reset();
            this.resetSubmit();
          }
        }
      } catch (err: any) {
        this.alertService.error(err.error.message);
      }
    }
  }
  turnArrayIntoList(array: string[]): string {
    return array.join(', ');
  }
  getBoolean(val: string | null) {
    if (val === 'true') {
      return true;
    }  else {
      return false;
    }
  }
  resetSubmit() {
    this.basicDetails()?.submitted.set(false);
    this.basicDetails()?.uncheck();
    this.purpose()?.submitted.set(false);
    this.typeofAgreement()?.submitted.set(false);
    this.specifications()?.submitted.set(false);
    this.complianceInformation()?.submitted.set(false);
    this.operationalRequirements()?.submitted.set(false);
    this.financialInformation()?.submitted.set(false);
  }
  async canDeactivate(): Promise<boolean> {
    if (this.changed()) {
      return await this.alertService.confirmUnsavedChanges();
    } else {
      return true;
    }
  }
}
