import React from 'react';
import Navbar from '@/components/layout/Navbar';

const NoteEditorPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <h4 className="mb-3">글 등록</h4>
        <p className="text-muted mb-0">여기에 글 등록 폼을 추가하면 됩니다.</p>
      </main>
    </>
  );
};

export default NoteEditorPage;
