import { Component, inject, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { HelpersService } from '../../../../core/services/helpers.service';
import { EMPTY_EXCEL, Excel } from '../../../../core/models/vehicle-records/excel.model';
import * as ExcelJS from 'exceljs';
import { VehicleRecordsService } from '../../../../core/services/vehicle-records.service';
import { AlertService } from '../../../../core/services/alert.service';
import { RouteService } from '../../../../core/services/route.service';

@Component({
  selector: 'app-upload-record',
  imports: [SharedModule],
  templateUrl: './upload-record.html',
  styleUrl: './upload-record.scss',
})
export class UploadRecord {
  alertService = inject(AlertService);
  routeService = inject(RouteService);
  helperService = inject(HelpersService);
  vehicleRecordsService = inject(VehicleRecordsService);
  excelSheet = signal<Excel>(EMPTY_EXCEL);
  isDragOver = signal(false);
  backendError = signal('');

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.handleFile(input.files?.[0] ?? null);
  }
  onFileCancelled(event: Event) {
    this.updateExcel(null, true, false, false, false);
    console.log(this.excelSheet())
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
    const input = event.dataTransfer as DataTransfer;
    this.handleFile(input.files?.[0] ?? null);
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(true);
  }
  onDragLeave() {
    this.isDragOver.set(false);
  }
  updateExcel(file: File | null, touched: boolean, isExcel: boolean, tooBig: boolean, backendError: boolean) {
    this.excelSheet.update(form => ({ ...form, file: file, touched: touched, isExcel: isExcel, tooBig: tooBig, backendError: backendError }));
  }
  async handleFile(file: File | null) {
    if (file) {
      const isExcel = ((await this.isExcelSheet(file)) && (await this.validateExcelContent(file)));
      const tooBig = (file.size > 25 * 1024 * 1024);
      this.updateExcel(file, true, isExcel, tooBig, false);
    } else {
      this.updateExcel(null, true, false, false, false);
    }
  }
  async isExcelSheet(file: File): Promise<boolean> {
    if (!file) return false;

    const validMimeTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    const isValidMime = validMimeTypes.includes(file.type);
    const isValidExt = file.name.toLowerCase().endsWith('.xlsx');

    if (!isValidMime && !isValidExt) return false;

    const headerBlob = file.slice(0, 4);
    const headerBuffer = await headerBlob.arrayBuffer();
    const header = new Uint8Array(headerBuffer);

    const isZip =
      header[0] === 0x50 && // P
      header[1] === 0x4b && // K
      (header[2] === 0x03 || header[2] === 0x05 || header[2] === 0x07);

    if (!isZip) return false;

    const footerBlob = file.slice(file.size - 22, file.size);
    const footerBuffer = await footerBlob.arrayBuffer();
    const footer = new Uint8Array(footerBuffer);

    const hasEndOfCentralDir =
      footer.includes(0x50) && footer.includes(0x4b);

    if (!hasEndOfCentralDir) return false;

    return true;
  }
  async validateExcelContent(file: File): Promise<boolean> {
    try {
      const buffer = await file.arrayBuffer();

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      
      if (!workbook.worksheets || workbook.worksheets.length === 0) return false;

      const firstSheet = workbook.worksheets[0];
      let hasData = false;

      firstSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1 && Number(row.values.length) > 1) {
          hasData = true;
        }
      });
      return hasData;
    } catch {
      return false;
    }
  }
  async upload() {
    if (!this.excelSheet().file || !this.excelSheet().isExcel || this.excelSheet().tooBig) {
      this.updateExcel(this.excelSheet().file, true, this.excelSheet().isExcel, this.excelSheet().tooBig, false);
    } else {
      try {
        if (await this.alertService.confirm('Confirm upload', 'Are you ready to upload?', 'Upload <i class="feather icon-upload"> </i>')) {
          const formData = new FormData();
          formData.append('file', this.excelSheet().file!);
          const answer = await this.alertService.load(this.vehicleRecordsService.uploadVehicleRecords(formData));
          if (answer) {
            this.alertService.success('Vehicle records uploaded');
            this.routeService.goToMasterRecord();
          } else {
            this.alertService.error('Upload failed');
          }
        }
      } catch(err: any) {
        console.log(err);
        this.updateExcel(this.excelSheet().file, true, this.excelSheet().isExcel, this.excelSheet().tooBig, true);
        this.backendError.set(this.formatUploadErrors(err.error));
        this.alertService.error('Upload failed');
      }
    }
  }
  formatUploadErrors(error: any) {
    const details = error?.error?.details || error?.details || [];
    if (!details.length) {
      return "Upload failed due to unknown error.";
    }
    const isHeaderError = details[0]?.rawHeader;
    if (isHeaderError) {
      const lines = details.map((d: any) => `• "${d.rawHeader}" (Column ${d.colNumber})`);
      return ["Upload failed: Unknown or invalid column(s) found:", ...lines].join("<br>");
    }
    const isRowError = details[0]?.field || details[0]?.message;
    if (isRowError) {
      const lines = details.map((d: any) => {
        return `• ${d.field ? `"${d.field}"` : "Row issue"}: ${
          d.message || d.error || "Invalid value"
        }`;
      });
      return ["Upload failed: Invalid data found in rows:", ...lines].join("<br>");
    }
    return "Upload failed due to unknown error.";
  }
}
