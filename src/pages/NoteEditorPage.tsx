import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { getFolders } from '@/api/folderApi';
import type { Folder } from '@/types/folder';

const NoteEditorPage: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const loadFolderSelect = () => {
    try {
      getFolders().then(data => setFolders(data));
    } catch {
      console.warn('folder load error');
    }
  };

  useEffect(() => {
    loadFolderSelect();
  }, []);

  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ maxWidth: '760px' }}>
        <h4 className="mb-4">글 등록</h4>

        <div className="mb-3">
          <label htmlFor="noteTitle" className="form-label fw-semibold">
            제목 <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="noteTitle"
            className="form-control"
            placeholder="노트 제목을 입력하세요"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="noteFolder" className="form-label fw-semibold">
            폴더 <span className="text-danger">*</span>
          </label>
          <select id="noteFolder" className="form-select">
            {folders &&
              folders.map(folder => {
                return <option value={folder.id}>{folder.name}</option>;
              })}
            {/*
            <option value="folder-001">React</option>
            <option value="folder-002">JavaScript</option> */}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="noteCode" className="form-label fw-semibold">
            코드
          </label>
          <textarea
            id="noteCode"
            className="form-control font-monospace"
            rows={8}
            placeholder="코드를 입력하세요"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="noteDescription" className="form-label fw-semibold">
            설명
          </label>
          <textarea
            id="noteDescription"
            className="form-control"
            rows={4}
            placeholder="코드에 대한 설명을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="noteTags" className="form-label fw-semibold">
            태그
          </label>
          <input
            type="text"
            id="noteTags"
            className="form-control"
            placeholder="쉼표로 구분해서 입력하세요 (예: javascript, react)"
          />
          <div className="form-text">쉼표(,)로 여러 태그를 입력할 수 있습니다.</div>
        </div>

        <div className="d-flex gap-2 justify-content-end">
          <button type="button" className="btn btn-outline-secondary">
            취소
          </button>
          <button type="button" className="btn btn-primary">
            저장
          </button>
        </div>
      </main>
    </>
  );
};

export default NoteEditorPage;
