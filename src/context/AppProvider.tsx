import { useState } from 'react'
import { AppContext } from '@/context/AppContext'

type AppProviderProps = {
    children: React.ReactNode
}

function AppProvider({ children }: AppProviderProps) { 
    const [themeColor, setThemeColor] = useState('skyblue');
    const changeThemeColor = (color: string) => { 
        setThemeColor(color);
    }

    async function get<T>(url: string): Promise<T> { 
        const response = await fetch(url);
        const data = await response.json();
        return data as T
    }

    return (
        <AppContext.Provider value={{
            themeColor, 
            changeThemeColor, 
            get
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;