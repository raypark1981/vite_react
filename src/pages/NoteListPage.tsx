import Navbar from '@/components/layout/Navbar';
import type { Folder } from '@/types/folder';
import type { StudyNote } from '@/types/note';

// * 더미 데이터 - 기능 구현 시 API로 교체
const DUMMY_FOLDERS: Folder[] = [
  { id: 'f1', name: 'React', parentId: null, createdAt: '', updatedAt: '' },
  { id: 'f2', name: 'TypeScript', parentId: null, createdAt: '', updatedAt: '' },
  { id: 'f3', name: 'JavaScript', parentId: null, createdAt: '', updatedAt: '' },
];

const DUMMY_NOTES: StudyNote[] = [
  {
    id: 'n1',
    folderId: 'f1',
    title: 'useState 기본 사용법',
    code: 'const [count, setCount] = useState(0);',
    description: 'React 상태 관리 기본 훅입니다.',
    tags: ['react', 'hooks'],
    createdAt: '2026-06-01T00:00:00.000Z',
    updatedAt: '2026-06-01T00:00:00.000Z',
  },
  {
    id: 'n2',
    folderId: 'f1',
    title: 'useEffect 의존성 배열',
    code: 'useEffect(() => { fetchData(); }, [id]);',
    description: '의존성 배열에 넣은 값이 바뀔 때만 실행됩니다.',
    tags: ['react', 'hooks', 'side-effect'],
    createdAt: '2026-06-02T00:00:00.000Z',
    updatedAt: '2026-06-02T00:00:00.000Z',
  },
  {
    id: 'n3',
    folderId: 'f2',
    title: 'Partial<T> 타입 유틸리티',
    code: 'const draft: Partial<StudyNote> = {};',
    description: '모든 필드를 선택적으로 만드는 유틸리티 타입입니다.',
    tags: ['typescript', 'utility-type'],
    createdAt: '2026-06-03T00:00:00.000Z',
    updatedAt: '2026-06-03T00:00:00.000Z',
  },
];

const NoteListPage = () => {
  // ! 기능 구현 시 이 값들을 useState + API로 교체하세요
  const selectedFolderId = 'f1';
  const searchKeyword = '';

  const filteredNotes = DUMMY_NOTES.filter(note => {
    const matchFolder = note.folderId === selectedFolderId;
    const matchKeyword =
      searchKeyword === '' ||
      note.title.includes(searchKeyword) ||
      note.description.includes(searchKeyword) ||
      note.code.includes(searchKeyword) ||
      note.tags.some(tag => tag.includes(searchKeyword));
    return matchFolder && matchKeyword;
  });

  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ maxWidth: '960px' }}>
        <div className="d-flex gap-3">
          {/* 왼쪽: 폴더 목록 */}
          <aside style={{ width: '200px', flexShrink: 0 }}>
            <h6 className="fw-semibold mb-2 text-secondary">폴더</h6>
            <ul className="list-group">
              {DUMMY_FOLDERS.map(folder => (
                <li
                  key={folder.id}
                  className={`list-group-item list-group-item-action py-2 px-3 ${
                    folder.id === selectedFolderId ? 'active' : ''
                  }`}
                  style={{ cursor: 'pointer', fontSize: '0.9rem' }}
                  // todo: onClick → 폴더 선택 상태 변경
                >
                  {folder.name}
                </li>
              ))}
            </ul>
          </aside>

          {/* 오른쪽: 노트 목록 */}
          <section className="flex-grow-1">
            {/* 검색창 */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="제목, 설명, 코드, 태그로 검색..."
                // todo: onChange → searchKeyword 상태 변경
              />
            </div>

            {/* 노트 카드 목록 */}
            {filteredNotes.length === 0 ? (
              <p className="text-muted text-center py-5">노트가 없습니다.</p>
            ) : (
              <div className="d-flex flex-column gap-2">
                {filteredNotes.map(note => (
                  <div key={note.id} className="card">
                    <div className="card-body py-3 px-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="card-title mb-1 fw-semibold">{note.title}</h6>
                        {/* todo: 수정/삭제 버튼 연결 */}
                        <div className="d-flex gap-1">
                          <button className="btn btn-sm btn-outline-secondary py-0 px-2">
                            수정
                          </button>
                          <button className="btn btn-sm btn-outline-danger py-0 px-2">
                            삭제
                          </button>
                        </div>
                      </div>

                      {note.description && (
                        <p className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
                          {note.description}
                        </p>
                      )}

                      {note.code && (
                        <pre
                          className="bg-light rounded p-2 mb-2"
                          style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
                        >
                          {note.code}
                        </pre>
                      )}

                      <div className="d-flex gap-1 flex-wrap">
                        {note.tags.map(tag => (
                          <span key={tag} className="badge bg-secondary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default NoteListPage;
