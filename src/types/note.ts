// 노트 데이터 타입 정의
export interface StudyNote {
  id: string;
  folderId: string;
  title: string;
  code: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudyNoteInput {
  id: string;
  folderId: string;
  title: string;
  code: string;
  description: string;
  tags: string[];
  createdAt: string;
}

export interface UpdateStudyNoteInput {
  folderId: string;
  title: string;
  code?: string;
  description?: string;
  tags?: string[];
  updatedAt: string;
}
