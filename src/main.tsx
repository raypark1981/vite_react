import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// TanStack Query: 서버 데이터 페칭/캐싱 라이브러리
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// 개발 환경에서만 쿼리 상태를 확인할 수 있는 디버그 패널
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isDev, isMSWEnabled, isVConsoleEnabled } from '@/config/env.ts';

import './index.css';
import App from './App.tsx';

// QueryClient: 캐시·요청 설정의 핵심 인스턴스 (앱 전체에서 하나만 생성)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10, // 다시 조회할 필요가 있는지 판단하는 기준
      gcTime: 1000 * 60 * 10,
      retry: 0, // 재시도 없음
    },
  },
});

if (isMSWEnabled && isDev) {
  const { worker } = await import('./mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
}

if (isVConsoleEnabled && isDev) {
  const VConsole = (await import('vconsole')).default;
  new VConsole();
  // ReactQueryDevtools 버튼과 겹치지 않도록 vConsole 버튼을 왼쪽으로 이동
  const style = document.createElement('style');
  style.textContent = '#__vconsole .vc-switch { right: 80px !important; }';
  document.head.appendChild(style);
}

createRoot(document.getElementById('root')!).render(
  // QueryClientProvider: useQuery 등이 queryClient에 접근할 수 있도록 context 제공
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* ReactQueryDevtools: 개발 환경에서만 렌더링 (프로덕션 번들에 포함 안 됨) */}
    {isDev && <ReactQueryDevtools initialIsOpen={false} />}
  </QueryClientProvider>,
);
