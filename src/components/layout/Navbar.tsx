import React from 'react';

// 공통 상단 네비게이션 바 (Bootstrap navbar 사용)
const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand fw-bold">📚 공부노트</span>
    </nav>
  );
};

export default Navbar;
