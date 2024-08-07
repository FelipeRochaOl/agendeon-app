import { createContext } from "react";
import { Client } from "../App";

export const ClientContext = createContext<Client>({} as Client)