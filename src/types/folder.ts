// 폴더 데이터 타입 정의
export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFolderInput {
  name: string;
  parentId: string | null;
}

export interface UpdateFolderInput {
  name?: string;
  parentId?: string | null;
}
