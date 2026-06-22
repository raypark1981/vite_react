import { http, HttpResponse } from 'msw';

export const folderHandlers = [
  http.get('http://*/folders', () =>
    HttpResponse.json([
      {
        id: 'folder-001',
        name: 'React12',
        parentId: null,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-06-05T00:21:46.922Z',
      },
      {
        id: 'folder-002',
        name: 'TypeScript',
        parentId: null,
        createdAt: '2026-01-02T00:00:00.000Z',
        updatedAt: '2026-01-02T00:00:00.000Z',
      },
    ]),
  ),
];
