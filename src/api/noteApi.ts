import { request } from '@/api/client';
import type { CreateStudyNoteInput, StudyNote, UpdateStudyNoteInput } from '@/types/note';

const NOTES_PATH = '/notes';
export const getStudyNotes = async (foldid: string): Promise<StudyNote[]> => {
  return request<StudyNote[]>(`${NOTES_PATH}?folderId=${foldid}`);
};

export const getStudyNote = async (id: string): Promise<StudyNote> => {
  return request<StudyNote>(`${NOTES_PATH}/${id}`);
};

export const createNote = async (input: CreateStudyNoteInput): Promise<CreateStudyNoteInput> => {
  const now = new Date().toISOString();
  const payload: CreateStudyNoteInput = {
    id: crypto.randomUUID(),
    folderId: input.folderId,
    title: input.title,
    code: input.code,
    description: input.description,
    tags: input.tags,
    createdAt: now,
  };
  const createdSturyNode = await request<StudyNote>(NOTES_PATH, { method: 'POST', body: payload });
  return createdSturyNode;
};

export const updateNote = async (id: string, input: UpdateStudyNoteInput): Promise<StudyNote> => {
  // //_id는 input 에서 id만 별도로 _id로 추출하여, 나머지 필드들은 rest로 묶어서 사용
  // //const { id: _id, ...rest } = input; //  공부용으로 남겨 둠
  const { ...rest } = input;
  return request<StudyNote>(`${NOTES_PATH}/${id}`, {
    method: 'PATCH',
    body: { ...rest, updatedAt: new Date().toISOString() },
  });
};

export const deleteNote = async (id: string) => {
  await request<void>(`${NOTES_PATH}/${id}`, { method: 'DELETE' });
};
