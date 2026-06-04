import { request } from '@/api/client';
import type { CreateFolderInput, Folder, UpdateFolderInput } from '@/types/folder';

const FOLDERS_PATH = '/folders';

export const getFolders = async (): Promise<Folder[]> => {
  // throw new Error('getFolders 함수가 구현되지 않았습니다.'); // TODO: 구현 필요
  return request<Folder[]>(FOLDERS_PATH);
};

export const createFolder = async (input: CreateFolderInput): Promise<Folder> => {
  const now = new Date().toISOString();
  const payload = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    parentId: input.parentId,
    createdAt: now,
    updatedAt: now,
  };

  const createdFolder = await request<Folder>(FOLDERS_PATH, { method: 'POST', body: payload });

  return createdFolder;
};

export const updateFolder = async (folderId: string, input: UpdateFolderInput): Promise<Folder> => {
  return request<Folder>(`${FOLDERS_PATH}/${folderId}`, {
    method: 'PATCH',
    body: {
      ...input,
      ...(input.name !== undefined ? { name: input.name.trim() } : {}),
      updatedAt: new Date().toISOString(),
    },
  });
};

export const deleteFolder = async (folderId: string): Promise<void> => {
  await request<void>(`${FOLDERS_PATH}/${folderId}`, {
    method: 'DELETE',
  });
};
