import { AddressProvider } from "./AddressContext";
import { AuthProvider } from "./AuthContext";
import { CategoryProvider } from "./CategoryContext";
import { ClientProvider } from "./ClientContext";
import { CommentProvider } from "./CommentContext";
import { CompanyProvider } from "./CompanyContext";
import { FilterProvider } from "./FilterContext";
import { ScheduleProvider } from "./ScheduleContext";
import { ServiceProvider } from "./ServiceContext";
import { SessionProvider } from "./SessionContext";
import { UserProvider } from "./UserContext";

interface GlobalContextProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalContextProps) => {
  return (
    <AuthProvider>
      <AddressProvider>
        <CategoryProvider>
          <ClientProvider>
            <CommentProvider>
              <CompanyProvider>
                <FilterProvider>
                  <ScheduleProvider>
                    <ServiceProvider>
                      <SessionProvider>
                        <UserProvider>
                          {children}
                        </UserProvider>
                      </SessionProvider>
                    </ServiceProvider>
                  </ScheduleProvider>
                </FilterProvider>
              </CompanyProvider>
            </CommentProvider>
          </ClientProvider>
        </CategoryProvider>
      </AddressProvider>
    </AuthProvider>
  )
}