import { createContext, ReactElement, useContext, useState } from "react";
import { API_URL } from "../config/Http";
import { Session } from "../interfaces/Session";
import { AuthContext } from "./AuthContext";

interface SessionContextType {
  sessions: Session[];
  getSessions: () => Promise<void>;
  createSession: (sessions: Omit<Session, 'code'>) => Promise<void>;
  updateSession: (sessions: Session) => Promise<void>;
  deleteSession: (code: string) => Promise<void>;
  openForm: boolean;
  setOpenForm: (open: boolean) => void;
}

export const SessionContext = createContext({} as SessionContextType);

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps): ReactElement<SessionContextType> => {
  const { token } = useContext(AuthContext)
  const url = `${API_URL}/session`
  const [sessions, setSessions] = useState<Session[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const getSessions = async () => {
    const response = await fetch(`${url}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const { data } = await response.json()
    if (!data) return
    const sessions: Session[] = data
    setSessions(sessions);
  };

  const createSession = async (session: Omit<Session, 'code'>) => {
    const sessionResponse = await fetch(`${url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: session.name
      })
    })
    const { data } = await sessionResponse.json()
    const newSession: Session = data
    setSessions([...sessions, newSession])
  };

  const updateSession = async (session: Session) => {
    await fetch(`${url}/${session.code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: session.name
      })
    })
    await getSessions()
  };

  const deleteSession = async (code: string) => {
    await fetch(`${url}/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    await getSessions()
  };

  return (
    <SessionContext.Provider value={{
      sessions, getSessions, createSession, updateSession, deleteSession, openForm, setOpenForm
    }}>
      {children}
    </SessionContext.Provider>
  );
};