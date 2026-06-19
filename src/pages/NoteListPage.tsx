import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
// import type { Folder } from '@/types/folder';
import type { UpdateStudyNoteInput } from '@/types/note';
import { getStudyNotes } from '@/api/noteApi';
import { getFolders } from '@/api/folderApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const NoteListPage = () => {
  const { data: folders = [], isSuccess: folderLoaded } = useQuery({
    queryKey: ['folders'],
    queryFn: getFolders,
    meta: { loadingMessage: '폴더 불러오는 중...' },
  });

  const { data: notes = [] } = useQuery({
    queryKey: ['notes'],
    queryFn: getStudyNotes,
    enabled: folderLoaded,
    meta: { loadingMessage: 'Notes 불러오는 중...' },
  });

  const { folderId } = useParams();
  // const [folders, setFolders] = useState<Folder[]>([]);
  // const [notes, setNotes] = useState<StudyNote[]>([]);
  // * useState 최초 1회만 실행이므로, Api로 채워진 값은 undefined가 되고, 실제 setFolder로 채워 져서 다시 리렌더링이 되어도 ,
  // * 초기 값은 변하지 않는다. 그래서 useEffect에 데이터 가져올때, 초기값을 셋팅하는 setSelectedFolerId(id)를 줌
  // // 잘못된 로직 const [selectedFolderId, setSelectedFolerId] = useState(folders.at(0)?.id);
  const [selectedFolderId, setSelectedFolerId] = useState<string | undefined>(folderId);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const filteredNotes = notes.filter(note => {
    const matchFolder = !selectedFolderId ? true : note.folderId === selectedFolderId;
    const matchKeyword =
      searchKeyword === '' ||
      note.title.includes(searchKeyword) ||
      note.description.includes(searchKeyword) ||
      note.code.includes(searchKeyword) ||
      note.tags.some(tag => tag.includes(searchKeyword));
    return matchFolder && matchKeyword;
  });

  const handleClickModify = (id: string, note: UpdateStudyNoteInput) => {
    navigate(`/notes/${id}/edit`, { state: { note } });
  };

  // * 동기/마이크로태스크(.then() 단순 반환) → 이벤트 루프 안 비워짐 → 리렌더 실행 안 됨
  // * 비동기 네트워크 요청(HTTP) → 이벤트 루프 비워짐 → 그 틈에 예약된 리렌더 실행 → HTTP 응답 오면 다시 .then() 재개 → 또 리렌더 예약 → 실행
  useEffect(() => {
    // getFolders()
    //   .then(data => {
    //     setFolders(data);
    //     // const id = data.at(0)?.id;
    //     // setSelectedFolerId(id);
    //     // return id; // 첫번째 폴더  id
    //   })
    //   .then(() => {
    //     // if (!firstFolderId) return;
    //     return getStudyNotes();
    //   })
    //   .then(data => {
    //     if (data) setNotes(data);
    //   })
    //   .catch(() => {
    //     console.warn('폴더 가져오기 오류');
    //   });
  }, []);
  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ maxWidth: '960px' }}>
        <div className="d-flex gap-3">
          {/* 왼쪽: 폴더 목록 */}
          <aside style={{ width: '200px', flexShrink: 0 }}>
            <h6 className="fw-semibold mb-2 text-secondary">폴더</h6>
            <ul className="list-group">
              <li
                onClick={() => {
                  setSelectedFolerId(undefined);
                  setSearchKeyword('');
                }}
                className={`list-group-item list-group-item-action py-2 px-3 ${!selectedFolderId ? 'active' : ''}`}
              >
                전체
              </li>{' '}
              {folders.map(folder => (
                // console.log(selectedFolderId),
                <li
                  key={folder.id}
                  className={`list-group-item list-group-item-action py-2 px-3 ${
                    folder.id === selectedFolderId ? 'active' : ''
                  }`}
                  style={{ cursor: 'pointer', fontSize: '0.9rem' }}
                  onClick={() => {
                    setSelectedFolerId(folder.id);
                    setSearchKeyword('');
                  }}
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
                onChange={e => setSearchKeyword(e.currentTarget.value)}
                value={searchKeyword}
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
                          <button
                            className="btn btn-sm btn-outline-secondary py-0 px-2"
                            onClick={() => handleClickModify(note.id, note)}
                          >
                            수정
                          </button>
                          <button className="btn btn-sm btn-outline-danger py-0 px-2">삭제</button>
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
                          style={{
                            fontSize: '0.8rem',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all',
                          }}
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
