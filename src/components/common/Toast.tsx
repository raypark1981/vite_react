import { useToastStore, type ToastState } from '@/stores/useToastStore';
import { useShallow } from 'zustand/shallow';

// interface ToastProps {
//   show: boolean;
//   message: string;
//   type?: 'success' | 'error' | 'warning' | 'info';
//   onClose: () => void;
// }

const TYPE_CLASS: Record<NonNullable<ToastState['type']>, string> = {
  success: 'text-bg-success',
  error: 'text-bg-danger',
  warning: 'text-bg-warning',
  info: 'text-bg-info',
};

// const Toast = ({ show, message, type = 'warning', onClose }: ToastProps) => {
const Toast = () => {
  const { show, type, message, hideToast, toggleToast } = useToastStore(
    useShallow(state => ({
      show: state.show,
      type: state.type,
      message: state.message,
      hideToast: state.hideToast,
      toggleToast: state.toggleToast,
    })),
  );
  // 각 하나씩 쓰는 경우 아래와 같이 쓰고,
  // const type = useToastStore(state => state.type);
  // const message = useToastStore(state => state.message);
  // const hideToast = useToastStore(state => state.hideToast);

  // 이렇게 한방에 가져오는데, useShallow가 없으면 무한 레더링이 일어 난다,
  // const { show, type, message, hideToast } = useToastStore(
  //   useShallow(state => ({
  //     show: state.show,
  //     type: state.type,
  //     message: state.message,
  //     hideToast: state.hideToast,
  //   })),
  // );

  // 가장 간편한 방법이긴 하나, count: 0 같이 다른 state가 변하면 역시 이페이지가 리렌더링이 일어난다.
  // const { show, type, message, hideToast } = useToastStore();

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 11000,
      }}
      onClick={() => {
        console.log('toggle');
        toggleToast();
      }}
    >
      <div
        className={`toast show d-flex align-items-center rounded-5 ${TYPE_CLASS[type]}`}
        style={{ width: 'max-content' }}
        role="alert"
      >
        <div className="toast-body fw-semibold">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 ms-auto"
          onClick={e => {
            console.log('close');
            e.stopPropagation();
            hideToast();
          }}
        />
      </div>
    </div>
  );
};

export default Toast;
