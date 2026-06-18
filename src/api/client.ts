import { isDev } from '@/config/env';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  method?: HttpMethod;
  body?: unknown;
}

// TODO: 테스트 완료 후 제거
const DEV_DELAY_MS = 1500;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  if (isDev) await sleep(DEV_DELAY_MS);
  const { body, headers, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  // 요청은 성공했지만 응답 본문이 없는 경우 (예: 204 No Content)
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};

export { API_BASE_URL, request };
