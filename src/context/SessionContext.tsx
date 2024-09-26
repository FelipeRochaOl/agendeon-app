import { createContext, ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { Toast } from "../components/Toast";
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
  const { token, logout } = useContext(AuthContext)
  const url = `${API_URL}/session`
  const [sessions, setSessions] = useState<Session[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const getSessions = useCallback(async () => {
    const response = await fetch(`${url}/list`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { data } = await response.json()
    if (!data) return
    const sessions: Session[] = data
    setSessions(sessions);
  }, [url]);

  useEffect(() => {
    getSessions()
  }, [getSessions]);

  const createSession = async (session: Omit<Session, 'code'>) => {
    const response = await fetch(`${url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: session.name
      })
    })
    if (response.status === 403) {
      await logout()
      return
    }
    const { data } = await response.json()
    const newSession: Session = data
    Toast({ type: 'info', text: 'Seção criada com sucesso' })
    setSessions([...sessions, newSession])
  };

  const updateSession = async (session: Session) => {
    const response = await fetch(`${url}/${session.code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: session.name
      })
    })
    if (response.status === 403) {
      await logout()
      return
    }
    Toast({ type: 'info', text: 'Seçao atualizada com sucesso' })
    await getSessions()
  };

  const deleteSession = async (code: string) => {
    const response = await fetch(`${url}/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    if (response.status === 403) {
      await logout()
      return
    }
    Toast({ type: 'warning', text: 'Seção deletada com sucesso' })
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