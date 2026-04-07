export interface PdfFileDataModel {
  quotes: Quote[],
}

export interface Quote {
  id: number;
  file: File | null;
  touched: boolean;
  duplicate: boolean;
  isPdf: boolean;
  tooBig: boolean;
}