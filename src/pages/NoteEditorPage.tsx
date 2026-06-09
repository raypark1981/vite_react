import { useEffect, useState, type KeyboardEvent } from 'react';
import Navbar from '@/components/layout/Navbar';
import { getFolders } from '@/api/folderApi';
import { createNote, updateNote } from '@/api/noteApi';
import type { Folder } from '@/types/folder';
import type { CreateStudyNoteInput, StudyNote, UpdateStudyNoteInput } from '@/types/note';
import TextInput from '@/components/common/FormInput';
import FormTextarea from '@/components/common/FormTextarea';
import { useParams, useLocation } from 'react-router-dom';
// const NoteEditorPage: React.FC<NoteEditorPageProps> = ({ id, note: _note }) => {
const NoteEditorPage = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const { id } = useParams();
  const { state } = useLocation();
  const _note = state?.note as StudyNote | undefined;

  // * Partial<StudyNote> 적용 후: Optionsl 프로퍼티로 변환되어, 모든 필드가 선택적으로 됨
  // * {
  // *   id?: string;       // 선택
  // *   folderId?: string; // 선택
  // *   title?: string;    // 선택
  // *   code?: string;     // 선택
  // *   ...
  // * }
  const [note, setNote] = useState<Partial<StudyNote>>(_note ?? {});
  const [tagInput, setTagInput] = useState<string>((_note?.tags ?? []).join(','));

  // 스키마 정보 그대로 key value 형태로 업데이트하는 범용 핸들러
  const handleChange = <K extends keyof StudyNote>(key: K, value: StudyNote[K]) => {
    setNote(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTagsChange = (value: string) => {
    // 태그는 공백 없이 콤마(,)로만 구분되도록 정규화합니다.
    const noSpaces = value.replace(/\s+/g, '');
    // 연속 콤마는 하나로 줄여 저장 값을 깔끔하게 유지합니다.
    const normalized = noSpaces.replace(/,+/g, ',');
    setTagInput(normalized);
    handleChange('tags', normalized.split(',').filter(Boolean));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 스페이스 입력 자체를 막아 태그 규칙(공백 불가)을 강제합니다.
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const toCreateInput = (draft: Partial<StudyNote>): CreateStudyNoteInput | null => {
    if (!draft.folderId || !draft.title) {
      return null;
    }

    return {
      id: draft.id ?? crypto.randomUUID(),
      folderId: draft.folderId,
      title: draft.title,
      code: draft.code ?? '',
      description: draft.description ?? '',
      tags: draft.tags ?? [],
      createdAt: draft.createdAt ?? new Date().toISOString(),
    };
  };

  const toUpdateInput = (draft: Partial<StudyNote>): UpdateStudyNoteInput | null => {
    if (!draft.title) {
      alert('제목은 필수 입력입니다. ');
      return null;
    }

    if (!draft.folderId) {
      alert('폴더 선택은 필수입니다. ');
      return null;
    }

    return {
      folderId: draft.folderId,
      title: draft.title,
      code: draft.code ?? '',
      description: draft.description ?? '',
      tags: draft.tags ?? [],
      updatedAt: draft.updatedAt ?? new Date().toISOString(),
    };
  };

  const handleClick = async () => {
    if (id) {
      const input = toUpdateInput(note);
      if (!input) {
        return;
      }

      await updateNote(id, input);
      return;
    } else {
      const input = toCreateInput(note);
      if (!input) {
        alert('폴더와 제목은 필수입니다.');
        return;
      }
      const created = await createNote(input);
      if (created.id) {
        // 목록으로 이동
      }
    }
  };

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

  console.log(note);
  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ maxWidth: '760px' }}>
        <h4 className="mb-4">글 등록</h4>

        <div className="mb-3">
          <label htmlFor="noteTitle" className="form-label fw-semibold">
            제목 <span className="text-danger">*</span>
          </label>
          <TextInput
            id={'noteTitle'}
            allowEmpty={false}
            title={'제목'}
            placeHolder={'노트 제목을 입력하세요.'}
            onChange={value => handleChange('title', value)}
            innerText={note.title || ''}
          ></TextInput>
        </div>

        <div className="mb-3">
          <label htmlFor="noteFolder" className="form-label fw-semibold">
            폴더 <span className="text-danger">*</span>
          </label>
          <select
            id="noteFolder"
            className="form-select"
            onChange={e => handleChange('folderId', e.target.value)}
          >
            <option value="">전체</option>
            {folders &&
              folders.map(folder => {
                return (
                  <option key={folder.id} value={folder.id} selected={folder.id === note.folderId}>
                    {folder.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="noteCode" className="form-label fw-semibold">
            코드
          </label>
          <FormTextarea
            id={'noteCode'}
            placeholder={'코드를 입력하세요'}
            rows={8}
            onChange={value => handleChange('code', value)}
            innerText={note.code}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="noteDescription" className="form-label fw-semibold">
            설명
          </label>
          <FormTextarea
            id={'noteDescription'}
            placeholder={'코드에 대한 설명을 입력하세요'}
            onChange={value => handleChange('description', value)}
            innerText={note.description}
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
            value={tagInput}
            onKeyDown={handleTagKeyDown}
            onChange={e => handleTagsChange(e.target.value)}
          />
          <div className="form-text">쉼표(,)로 여러 태그를 입력할 수 있습니다.</div>
        </div>

        <div className="d-flex gap-2 justify-content-end">
          <button type="button" className="btn btn-outline-secondary">
            취소
          </button>
          <button type="button" className="btn btn-primary" onClick={handleClick}>
            저장
          </button>
        </div>
      </main>
    </>
  );
};

export default NoteEditorPage;
