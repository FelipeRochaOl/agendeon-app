import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { Toast } from "../components/Toast"
import { API_URL } from "../config/Http"
import { Service } from "../interfaces/Service"
import { AuthContext } from "./AuthContext"
import { Client } from "./ClientContext"
import { Company, CompanyContext } from "./CompanyContext"

export interface Schedule {
  id: string
  company: Company
  client: Client
  service: Service
  total: number
  formattedTotal: string
  scheduleDate: string
  formattedDate: string
  hour: number
  minute: number
  formattedTime: string
  status: 'canceled' | 'approved'
}

export interface ScheduleCreate {
  id?: string
  companyId: string
  serviceId: string
  serviceName: string
  total: number
  priceFormatted: string
  scheduleDate: string | Date
  formattedDate: string
  hour: number
  minute: number
  formattedTime: string
  status: string
}

export interface ScheduleHistory {
  scheduleDate: string
  hour: number
  minutes: number
}

interface ScheduleContextType {
  checkout: ScheduleCreate[]
  setCheckout: (checkout: ScheduleCreate[]) => void
  history: ScheduleHistory[] | undefined
  schedules: Schedule[]
  getHistory: (companyId: string) => void
  getSchedules: (companyId: string) => void
  createSchedule: (schedule: ScheduleCreate) => Promise<string | null>
  updateSchedule: (schedule: Schedule) => void
  deleteSchedule: (id: string) => void
}

export const ScheduleContext = createContext({} as ScheduleContextType)

interface ScheduleProviderProps {
  children: React.ReactNode
}

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const { token, logout, isBusiness } = useContext(AuthContext)
  const { company } = useContext(CompanyContext)
  const url = `${API_URL}/schedules`
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [checkout, setCheckout] = useState<ScheduleCreate[]>([])
  const [history, setHistory] = useState<ScheduleHistory[] | undefined>(undefined)

  const getSchedules = useCallback(async (companyId: string) => {
    const checkUrl = isBusiness ? `${url}/${companyId}/company` : `${url}/${companyId}`
    const response = await fetch(checkUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    if (response.status === 403) {
      await logout()
      return
    }
    const { data } = await response.json()
    const schedule: Schedule[] = data
    setSchedules(schedule);
  }, [isBusiness, url, token, logout])

  useEffect(() => {
    if (company && Object.keys(company).length) {
      getSchedules(company.id)
    }
  }, [company, getSchedules])

  const getHistory = async (companyId: string) => {
    const response = await fetch(`${url}/${companyId}/history`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    if (response.status === 403) {
      await logout()
      return
    }
    const { data } = await response.json()
    const history: ScheduleHistory[] = data ?? []
    setHistory(history);
  }

  const createSchedule = async (scheduleNew: ScheduleCreate) => {
    const response = await fetch(`${url}/${scheduleNew.companyId}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(scheduleNew)
    })
    if (response.status === 403) {
      await logout()
      return ""
    }
    const { data } = await response.json()
    if (!data) throw new Error('Erro ao criar agenda')
    const schedule: Schedule = data
    setSchedules([...schedules, schedule]);
    Toast({ text: 'Agendamento realizado', type: 'success' })
    return schedule.id as string
  }

  const updateSchedule = async (schedulePut: Schedule) => {
    const { id, ...data } = schedulePut
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    })
    if (response.status === 403) {
      await logout()
      return
    }
    setSchedules([...schedules, schedulePut]);
  }

  const deleteSchedule = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
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
    const result = schedules.filter((data) => data.id !== id);
    setSchedules(result);
  }

  return (
    <ScheduleContext.Provider value={{ history, schedules, checkout, getSchedules, createSchedule, updateSchedule, deleteSchedule, getHistory, setCheckout }}>
      {children}
    </ScheduleContext.Provider>
  )
}