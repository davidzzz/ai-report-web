export interface SalesRecord {
  date: string;
  product: string;
  region: string;
  unitsSold: number;
  unitPrice: number;
}

export interface ReportPayload {
  companyName?: string;
  period?: string;
  sales: SalesRecord[];
}

export interface AnalyzeResponse {
  context: string;
  summary: string;
  insights: string[];
}
