import {
  useIsFetching,
  useIsMutating,
  useQueryClient,
  useMutationState,
} from '@tanstack/react-query';

const GlobalLoadingOverlay = () => {
  const queryClient = useQueryClient();
  // useIsFetching이 fetching 값을 구독중이어서, 그 시점의 캐시 상태를 읽음
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const fetchingMessage =
    (queryClient.getQueryCache().findAll({ fetchStatus: 'fetching' }).at(0)?.meta
      ?.loadingMessage as string) ?? '불러오는 중...';

  const mutationMessage = useMutationState({
    filters: { status: 'pending' },
    select: mutation => mutation.options.meta?.loadingMessage,
  });

  const message = mutationMessage.find(Boolean) ?? fetchingMessage ?? '처리중...';

  if (!(isFetching || isMutating)) return null;

  return (
    <div className="loading-overlay">
      <div className="d-flex flex-column align-items-center gap-2 text-white">
        <div className="spinner-border" role="status" aria-hidden="true" />
        <small>{message as string}</small>
      </div>
    </div>
  );
};

export default GlobalLoadingOverlay;
