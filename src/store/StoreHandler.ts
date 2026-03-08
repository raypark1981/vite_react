import { create } from 'zustand'

type StoreType = {
    count: number,
    text: string,
    increase: () => void, 
    decrease: () => void,
    changeText: (text: string) => void
}

export const useStore = create<StoreType>((set) => ({
    count: 0, 
    text: 'hello',
    // 이렇게 함수 실행하는 거임  const func = () => ({}), func() 리턴 object임
    increase: () => set((prev) => ({ count: prev.count + 1 })),
    decrease: () => set((prev) => ({ count: prev.count - 1 })),
    changeText:(text) => set(() => ({text}))
}))
