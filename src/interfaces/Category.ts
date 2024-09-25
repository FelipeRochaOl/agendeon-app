import { Session } from "./Session";

export interface Category {
  code: string;
  session: Session;
  name: string;
  urlPath: string;
}

export interface CategoryRequest {
  code: string;
  sessionCode: string;
  name: string;
}
