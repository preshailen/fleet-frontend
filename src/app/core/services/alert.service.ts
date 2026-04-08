import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, lastValueFrom} from 'rxjs';
import { Index } from '../models/index.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  public async confirmUnsavedChanges(): Promise<boolean> {
    const result = await Swal.fire({
      title: 'Unsaved changes',
      text: 'You have unsaved changes. Leave anyway?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel <i class="feather icon-x"></i>',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Go <i class="feather icon-external-link"></i>',
      confirmButtonColor: '#2ed8b6',
      reverseButtons: true,
      focusConfirm: true,
      allowOutsideClick: false
    });
    return result.isConfirmed;
  }
  public async load<T>(obs$: Observable<T>) {
    Swal.fire({
      title: 'Loading',
      icon: 'info',
      showCancelButton: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    });
    return await lastValueFrom(obs$);
  }
  public success(successText: string): void {
    Swal.fire({
      title: 'Success!',
      icon: 'success',
      text: successText,
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: false,
      timer: 3000
    })
  }
  public error(errorText: string): void {
    Swal.fire({
      title: 'Error!',
      icon: 'error',
      text: errorText,
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: false,
      timer: 3000
    })
  }
  public async confirm(title: string, text: string, confirmText: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text:  text,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel <i class="feather icon-x"></i>',
      cancelButtonColor: '#dc3545',
      confirmButtonText: confirmText,
      confirmButtonColor: '#2ed8b6',
      reverseButtons: true,
      focusConfirm: true,
      allowOutsideClick: false
    }).then((result) => result.isConfirmed);
  }  
  public async confirmDelete(): Promise<boolean> {
    return Swal.fire({
      title: 'Confirm delete',
      text: 'Are you sure that you want to delete item?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel <i class="feather icon-x"></i>',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Delete <i class="feather icon-x"></i>',
      confirmButtonColor: '#dc3545',
      reverseButtons: true,
      focusConfirm: true,
      allowOutsideClick: false
    }).then((result) => result.isConfirmed);
  }
  public showPdfPreview(file: File) {
    const fileURL = URL.createObjectURL(file);
    Swal.fire({
      title: 'Pdf Preview',
      html: `<iframe src="${fileURL}" style="width:100%; height:80vh; border:none;"></iframe>`,
      width: '75%',
      showCloseButton: true,
      showConfirmButton: false,
      willClose: () => {
        URL.revokeObjectURL(fileURL);
      }
    });
  }
  public showOnlinePdfPreview(url: string) {
    Swal.fire({
      title: 'Pdf Viewer',
      html: `<iframe src="${url}" style="width:100%; height:80vh; border:none;"></iframe>`,
      width: '75%',
      showCloseButton: true,
      showConfirmButton: false
    });
  }
  public async selectPreferredQuote(quotes: any[]) {
    let selectedValue: any = null;
    return await Swal.fire({
      title: 'Select a Quote',
      html: `
        <div style="text-align:left;">

          ${quotes.map((q, index) => `
            <label style="
              display:block;
              padding:12px;
              margin-bottom:10px;
              border:1px solid #ddd;
              border-radius:8px;
              cursor:pointer;
              transition: all 0.2s;
            ">
              <input type="radio" name="quote" value="${q._id}" style="margin-right:10px;"/>
              📄 <strong>${q.fileName}</strong>
            </label>
          `).join('')}
        </div>
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancel <i class="feather icon-x"></i>',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Select <i class="feather icon-flag"></i>',
      confirmButtonColor: '#2ed8b6',
      reverseButtons: true,
      focusConfirm: true,
      allowOutsideClick: false,
      didOpen: () => {
        const radios = Swal.getHtmlContainer()?.querySelectorAll('input[name="quote"]');
        radios?.forEach(radio => {
          radio.addEventListener('change', () => {
            selectedValue = (radio as any).value;
          });
        });
      },
      preConfirm: () => {
        if (!selectedValue) {
          Swal.showValidationMessage('Please select a quote');
          return false;
        }
        return selectedValue;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        return result.value;
      }
    });
  }
  public async reject() {
    return Swal.fire({
      title: 'Reject!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel <i class="feather icon-x"></i>',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Reject <i class="feather icon-x"></i>',
      confirmButtonColor: '#dc3545',
      reverseButtons: true,
      focusConfirm: true,
      allowOutsideClick: false
    }).then((result) => result.isConfirmed);
  }
  public async addItem(items: Index[] | undefined) {
    return await Swal.fire({
      title: 'Add Item',
      input: 'textarea',
      inputPlaceholder: 'Enter description...',
      showCancelButton: true,
      cancelButtonText: 'Cancel <i class="feather icon-x"></i>',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Add <i class="feather icon-plus"></i>',
      confirmButtonColor: '#2ed8b6',
      reverseButtons: true,
      focusConfirm: true,
      allowOutsideClick: false,
      width: '75%',
      preConfirm: (value) => {
        const trimmed = value?.trim();
        if (!trimmed) {
          Swal.showValidationMessage('Description is required');
          return false;
        }
        const exists = (items ?? []).some(item => item.description && item.description.trim().toLowerCase() === trimmed.toLowerCase());
        if (exists) {
          Swal.showValidationMessage('Description already exists');
          return false;
        }
        return trimmed;
      }
    }).then(result => {
      if (result.isConfirmed) {
        return result.value;
      }
    });
  }
}
