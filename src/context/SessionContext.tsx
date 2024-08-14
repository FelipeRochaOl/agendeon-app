import { createContext, ReactElement, useState } from "react";

export interface Session {
  code: string;
  name: string;
}

interface SessionContextType {
  sessions: Session[];
  getSessions: () => Promise<void>;
  createSession: (sessions: Omit<Session, 'code'>) => Promise<void>;
  updateSession: (sessions: Session) => Promise<void>;
  deleteSession: (code: string) => Promise<void>;
}

export const SessionContext = createContext({} as SessionContextType);

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps): ReactElement<SessionContextType> => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const getSessions = async () => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const response = await fetch('http://localhost:8080/session/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const data: Session[] = await response.json()
    setSessions(data);
  };

  const createSession = async (session: Omit<Session, 'code'>) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch('http://localhost:8080/session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify({
        name: session.name
      })
    })
    await getSessions()
  };

  const updateSession = async (session: Session) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch(`http://localhost:8080/session/${session.code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify({
        name: session.name
      })
    })
    await getSessions()
  };

  const deleteSession = async (code: string) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch(`http://localhost:8080/session/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    await getSessions()
  };

  return (
    <SessionContext.Provider value={{ sessions, getSessions, createSession, updateSession, deleteSession }}>
      {children}
    </SessionContext.Provider>
  );
};