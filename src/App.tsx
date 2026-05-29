import { Routes, Route } from 'react-router-dom';
import FolderPage from '@/pages/FolderPage';

// 라우팅 설정
// - /        → 폴더 관리 페이지 (메인)
// 추후 노트 페이지, 에디터 페이지 등 Route 추가 예정
function App() {
  return (
    <Routes>
      <Route path="/" element={<FolderPage />} />
    </Routes>
  );
}

export default App;
