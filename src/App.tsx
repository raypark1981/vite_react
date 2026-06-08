import { Navigate, Route, Routes } from 'react-router-dom';
import FolderPage from '@/pages/FolderPage';
import NoteEditorPage from '@/pages/NoteEditorPage';
import NoteListPage from '@/pages/NoteListPage';

// 라우팅 설정
// - /        → 폴더 관리 페이지 (메인)
// 추후 노트 페이지, 에디터 페이지 등 Route 추가 예정
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/folders" replace />} />
      <Route path="/folders" element={<FolderPage />} />
      <Route path="/notes/new" element={<NoteEditorPage />} />
      <Route path="/notes/list" element={<NoteListPage />} />
    </Routes>
  );
}

export default App;
