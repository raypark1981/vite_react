import React from 'react';
import { NavLink } from 'react-router-dom';

// 공통 상단 네비게이션 바 (Bootstrap navbar 사용)
const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid px-0">
        <span className="navbar-brand fw-bold">📚 개발노트</span>

        <ul className="navbar-nav flex-row gap-2">
          <li className="nav-item">
            <NavLink
              to="/folders"
              className={({ isActive }) =>
                `nav-link px-2 ${isActive ? 'active fw-semibold text-white' : ''}`
              }
            >
              폴더관리
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/notes/new"
              className={({ isActive }) =>
                `nav-link px-2 ${isActive ? 'active fw-semibold text-white' : ''}`
              }
            >
              글등록
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/notes/list"
              className={({ isActive }) =>
                `nav-link px-2 ${isActive ? 'active fw-semibold text-white' : ''}`
              }
            >
              글목록{' '}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
