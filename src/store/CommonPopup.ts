import { create } from 'zustand'

type CommonPopupStore = {
    isOpen: boolean
    , content: string
    , open: (content: string) => void   
    , close: () => void
}

export const useCommonPopupStore = create<CommonPopupStore>((set) => ({
    isOpen: false,
    content: '',
    open: (content: string) => { 
        set(() => { return { isOpen: true, content: content } })
        // set((prev) => ({ isOpen: !prev.isOpen, content: '' }))
    },  
    close: () => set(() => ({ isOpen: false, content: ''}))
}))