import { Company } from "./Company";

export interface Service {
  code: string;
  description: string;
  value: number;
  duration: number;
  formattedValue: string;
  company: Company;
}

export interface ServiceRequest {
  code?: string;
  description: string;
  value: number;
  duration: number;
  companyId: string;
}
