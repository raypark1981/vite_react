import React, { useState } from 'react';
import type { Folder } from '@/types/folder';
import FolderTree from '@/components/folder/FolderTree';
import Navbar from '@/components/layout/Navbar';

// 임시 초기 데이터 (추후 localStorage 또는 API로 교체)
const INITIAL_FOLDERS: Folder[] = [
  { id: '1', name: 'React',      parentId: null, createdAt: '2025-01-01' },
  { id: '2', name: 'TypeScript', parentId: null, createdAt: '2025-01-02' },
  { id: '3', name: 'Hooks',      parentId: '1',  createdAt: '2025-01-03' },
  { id: '4', name: 'Components', parentId: '1',  createdAt: '2025-01-04' },
];

const FolderPage: React.FC = () => {
  const [folders, setFolders]       = useState<Folder[]>(INITIAL_FOLDERS);
  const [selectedId, setSelectedId] = useState<string | null>(null); // 현재 선택된 폴더 id
  const [showModal, setShowModal]   = useState(false);
  const [editTarget, setEditTarget] = useState<Folder | null>(null); // null = 새 폴더
  const [inputName, setInputName]   = useState('');

  // 현재 위치의 직속 자식 폴더 목록
  const currentFolders = folders.filter(f => f.parentId === selectedId);

  // 브레드크럼: 루트 → 현재 폴더까지의 경로
  const getBreadcrumb = (): Folder[] => {
    const path: Folder[] = [];
    let cur: string | null = selectedId;
    while (cur) {
      const found = folders.find(f => f.id === cur);
      if (!found) break;
      path.unshift(found);
      cur = found.parentId;
    }
    return path;
  };

  // --- 폴더 CRUD ---

  const handleSave = () => {
    if (!inputName.trim()) return;

    if (editTarget) {
      // 이름 변경
      setFolders(prev =>
        prev.map(f => f.id === editTarget.id ? { ...f, name: inputName.trim() } : f)
      );
    } else {
      // 새 폴더 생성 (현재 위치 아래에 추가)
      const newFolder: Folder = {
        id: Date.now().toString(),
        name: inputName.trim(),
        parentId: selectedId,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setFolders(prev => [...prev, newFolder]);
    }
    closeModal();
  };

  // 폴더 삭제 (하위 폴더 포함 재귀 삭제)
  const handleDelete = (targetId: string) => {
    const collectIds = (id: string): string[] => {
      const children = folders.filter(f => f.parentId === id).map(f => f.id);
      return [id, ...children.flatMap(collectIds)];
    };
    const toDelete = new Set(collectIds(targetId));
    setFolders(prev => prev.filter(f => !toDelete.has(f.id)));
  };

  const openCreateModal = () => {
    setEditTarget(null);
    setInputName('');
    setShowModal(true);
  };

  const openEditModal = (folder: Folder) => {
    setEditTarget(folder);
    setInputName(folder.name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setInputName('');
    setEditTarget(null);
  };

  const breadcrumb = getBreadcrumb();

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row" style={{ minHeight: 'calc(100vh - 56px)' }}>

          {/* ── 사이드바 ── */}
          <aside className="col-md-3 col-xl-2 border-end bg-light py-3">
            <div className="d-flex justify-content-between align-items-center mb-2 px-1">
              <small className="text-muted fw-semibold text-uppercase">폴더</small>
              <button
                className="btn btn-sm btn-outline-primary"
                title="새 폴더"
                onClick={openCreateModal}
              >
                +
              </button>
            </div>
            <FolderTree
              folders={folders}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </aside>

          {/* ── 메인 콘텐츠 ── */}
          <main className="col-md-9 col-xl-10 py-3 px-4">

            {/* 브레드크럼 */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className={`breadcrumb-item ${selectedId === null ? 'active' : ''}`}>
                  <span
                    role="button"
                    className={selectedId === null ? '' : 'text-primary text-decoration-underline'}
                    onClick={() => setSelectedId(null)}
                  >
                    전체
                  </span>
                </li>
                {breadcrumb.map((f, i) => {
                  const isLast = i === breadcrumb.length - 1;
                  return (
                    <li key={f.id} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                      {isLast ? f.name : (
                        <span
                          role="button"
                          className="text-primary text-decoration-underline"
                          onClick={() => setSelectedId(f.id)}
                        >
                          {f.name}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* 툴바 */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {breadcrumb.length > 0
                  ? breadcrumb[breadcrumb.length - 1].name
                  : '전체 폴더'}
                <span className="ms-2 badge bg-secondary fw-normal" style={{ fontSize: '0.75rem' }}>
                  {currentFolders.length}개
                </span>
              </h5>
              <button className="btn btn-primary btn-sm" onClick={openCreateModal}>
                + 새 폴더
              </button>
            </div>

            {/* 폴더 카드 그리드 */}
            {currentFolders.length === 0 ? (
              <div className="text-center text-muted py-5">
                <div style={{ fontSize: '3.5rem' }}>📂</div>
                <p className="mt-2">폴더가 없습니다. 새 폴더를 만들어보세요.</p>
                <button className="btn btn-outline-primary btn-sm" onClick={openCreateModal}>
                  + 새 폴더 만들기
                </button>
              </div>
            ) : (
              <div className="row g-3">
                {currentFolders.map(folder => (
                  <div key={folder.id} className="col-6 col-sm-4 col-md-3 col-xl-2">
                    <div
                      className="card h-100 border folder-card"
                      onDoubleClick={() => setSelectedId(folder.id)} // 더블클릭으로 진입
                    >
                      <div className="card-body text-center py-3 px-2">
                        <div style={{ fontSize: '2.5rem' }}>📁</div>
                        <p
                          className="card-title small fw-semibold mb-1 text-truncate"
                          title={folder.name}
                        >
                          {folder.name}
                        </p>
                        <small className="text-muted">{folder.createdAt}</small>
                      </div>
                      <div className="card-footer bg-transparent d-flex justify-content-end gap-1 py-1 px-2">
                        {/* 이름 변경 */}
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          title="이름 변경"
                          onClick={e => { e.stopPropagation(); openEditModal(folder); }}
                        >
                          ✏️
                        </button>
                        {/* 삭제 */}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="삭제"
                          onClick={e => { e.stopPropagation(); handleDelete(folder.id); }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── 폴더 생성 / 이름 변경 모달 ── */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={closeModal} // 배경 클릭 시 닫기
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={e => e.stopPropagation()} // 모달 내부 클릭은 전파 차단
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editTarget ? '폴더 이름 변경' : '새 폴더 만들기'}
                </h5>
                <button className="btn-close" onClick={closeModal} />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="폴더 이름"
                  value={inputName}
                  onChange={e => setInputName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSave()}
                  autoFocus
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>취소</button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={!inputName.trim()}
                >
                  {editTarget ? '변경' : '만들기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FolderPage;
