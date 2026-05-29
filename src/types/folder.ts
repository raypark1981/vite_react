// 폴더 데이터 타입 정의
export type Folder = {
  id: string;
  name: string;
  parentId: string | null; // null = 최상위 폴더
  createdAt: string;       // 'YYYY-MM-DD' 형식
};
