import { ClientProvider } from "./ClientContext";
import { SessionProvider } from "./SessionContext";

interface GlobalContextProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalContextProps) => {
  return (
    <SessionProvider>
      <ClientProvider>
        {children}
      </ClientProvider>
    </SessionProvider>
  )
}