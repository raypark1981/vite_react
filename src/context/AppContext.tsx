import { createContext } from 'react'

type AppContextType = {
    themeColor: string
    changeThemeColor: (color: string) => void
    get: <T>(url: string) => Promise<T>
}   

export const AppContext = createContext<AppContextType | null>(null);