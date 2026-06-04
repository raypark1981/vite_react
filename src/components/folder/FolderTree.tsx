import React, { useState } from 'react';
import type { Folder } from '@/types/folder';

type Props = {
  folders: Folder[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

// 폴더 트리의 개별 항목 (재귀 렌더링)
const FolderTreeItem: React.FC<{
  folder: Folder;
  folders: Folder[];
  depth: number;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}> = ({ folder, folders, depth, selectedId, onSelect }) => {
  const children = folders.filter(f => f.parentId === folder.id);
  const hasChildren = children.length > 0;
  const isSelected = selectedId === folder.id;

  // 하위 폴더가 있을 때 펼침/접힘 상태
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div
        className={`d-flex align-items-center py-1 rounded ${isSelected ? 'bg-primary text-white' : 'text-dark'}`}
        style={{ paddingLeft: `${depth * 14 + 8}px`, cursor: 'pointer' }}
        onClick={() => onSelect(folder.id)}
      >
        {/* 하위 폴더가 있으면 펼침 버튼 */}
        {hasChildren ? (
          <span
            className="me-1"
            style={{ fontSize: '0.65rem', width: '12px' }}
            onClick={e => { e.stopPropagation(); setIsOpen(prev => !prev); }}
          >
            {isOpen ? '▼' : '▶'}
          </span>
        ) : (
          <span style={{ width: '13px', display: 'inline-block' }} />
        )}
        <span className="me-1">📁</span>
        <span className="small text-truncate">{folder.name}</span>
      </div>

      {/* 하위 폴더 재귀 렌더링 */}
      {isOpen && children.map(child => (
        <FolderTreeItem
          key={child.id}
          folder={child}
          folders={folders}
          depth={depth + 1}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

// 사이드바에 표시되는 폴더 트리 전체
const FolderTree: React.FC<Props> = ({ folders, selectedId, onSelect }) => {
  const rootFolders = folders.filter(f => f.parentId === null);

  return (
    <div>
      {/* 최상위 "전체" 항목 */}
      <div
        className={`d-flex align-items-center py-1 px-2 rounded mb-1 ${selectedId === null ? 'bg-primary text-white' : 'text-dark'}`}
        style={{ cursor: 'pointer' }}
        onClick={() => onSelect(null)}
      >
        <span className="me-1">🏠</span>
        <span className="small fw-semibold">전체</span>
      </div>

      {rootFolders.map((folder) => (
        <FolderTreeItem
          key={folder.id}
          folder={folder}
          folders={folders}
          depth={0}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default FolderTree;
