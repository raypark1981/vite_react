import React from 'react';

interface LoadingBarProps {
  message?: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ message = '불러오는 중...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
      <div className="spinner-border spinner-border-sm mb-2" role="status" aria-hidden="true" />
      <small>{message}</small>
    </div>
  );
};

export default LoadingBar;
