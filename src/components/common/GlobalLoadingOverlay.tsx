import { useIsFetching, useQueryClient } from '@tanstack/react-query';

const GlobalLoadingOverlay = () => {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();
  // useIsFetching이 fetching 값을 구독중이어서, 그 시점의 캐시 상태를 읽음

  const message =
    (queryClient.getQueryCache().findAll({ fetchStatus: 'fetching' }).at(0)?.meta
      ?.loadingMessage as string) ?? '불러오는 중...';
  if (!isFetching) return null;

  return (
    <div className="loading-overlay">
      <div className="d-flex flex-column align-items-center gap-2 text-white">
        <div className="spinner-border" role="status" aria-hidden="true" />
        <small>{message}</small>
      </div>
    </div>
  );
};

export default GlobalLoadingOverlay;
