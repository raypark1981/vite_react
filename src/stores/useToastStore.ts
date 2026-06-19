import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
  toggleToast: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  show: false,
  message: '',
  type: 'info',
  showToast: (message, type = 'info') => set({ message: message, show: true, type: type }),
  hideToast: () => set({ show: false, message: '' }),
  toggleToast: () => {
    const currentShow = get().show;
    set({
      show: !currentShow,
    });
  },
}));
