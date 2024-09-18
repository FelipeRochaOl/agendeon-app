import { Session } from "./Session";

export interface Category {
  code: string;
  session: Session;
  name: string;
}

export interface CategoryRequest {
  code: string;
  sessionCode: string;
  name: string;
}
