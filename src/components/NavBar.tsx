import React, { useState } from 'react';
import { FaCommentAlt, FaFire, FaPlay, FaUser } from 'react-icons/fa';
import './NavBar.css';

type NavItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

const navItems: NavItem[] = [
    { id: 'home', label: '홈', icon: <FaCommentAlt /> },
    { id: 'popular', label: '인기&신작', icon: <FaFire /> },
    { id: 'continue', label: '이어보기', icon: <FaPlay /> },
    { id: 'mypage', label: '내 페이지', icon: <FaUser /> },
];

const NavBar: React.FC = () => {
    const [active, setActive] = useState<string>('home');

    return (
        <nav className="bottom-nav">
            {navItems.map(({ id, label, icon }) => (
                <button
                    key={id}
                    className={`nav-button ${active === id ? 'active' : ''}`}
                    onClick={() => setActive(id)}
                    type="button"
                >
                    <div className="icon">{icon}</div>
                    <div className="label">{label}</div>
                </button>
            ))}
        </nav>
    );
};

export default NavBar;
