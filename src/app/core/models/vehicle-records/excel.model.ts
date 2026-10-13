export interface Excel {
  file: File | null,
  touched: boolean,
  isExcel: boolean,
  tooBig: boolean,
  backendError: boolean
}

export const EMPTY_EXCEL: Excel = {
  file: null,
  touched: false,
  isExcel: false,
  tooBig: false,
  backendError: false
}