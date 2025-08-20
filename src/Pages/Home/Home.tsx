import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import { SearchIcon } from '../../components/icons/SearchIcon';
import NavBar from '../../components/NavBar';

type CardItem = { id: string; image: string; title: string; description: string; author: string };
type SimpleUser = { id: string; image: string; name: string };

const TOP_USERS: SimpleUser[] = [
    { id: 'u1', image: 'https://picsum.photos/seed/u1/80/80', name: '서도겸' },
    { id: 'u2', image: 'https://picsum.photos/seed/u2/80/80', name: '유진' },
    { id: 'u3', image: 'https://picsum.photos/seed/u3/80/80', name: '다온' },
];

const HOME_NOVELS: CardItem[] = [
    { id: 'n1', image: 'https://picsum.photos/seed/n1/400/300', title: '검의 노래', description: '운명을 거스르는 소년의 일대기', author: '란' },
    { id: 'n2', image: 'https://picsum.photos/seed/n2/400/300', title: '달의 주인', description: '폐허 위의 왕국', author: '유화' },
    { id: 'n3', image: 'https://picsum.photos/seed/n3/400/300', title: '바람의 길', description: '길 위에서 만난 동료들', author: '고래' },
    { id: 'n4', image: 'https://picsum.photos/seed/n4/400/300', title: '유령 작가', description: '사라진 문장을 찾아서', author: '미나' },
];

const HOME_NOTES: CardItem[] = [
    { id: 'm1', image: 'https://picsum.photos/seed/m1/400/300', title: '정글 탐험기', description: '첫 캠핑 준비 리스트', author: '파인' },
    { id: 'm2', image: 'https://picsum.photos/seed/m2/400/300', title: 'AI 실험노트', description: '프롬프트 실험 기록', author: '솔' },
    { id: 'm3', image: 'https://picsum.photos/seed/m3/400/300', title: '러닝 로그', description: '10K 페이스 관리', author: '민' },
    { id: 'm4', image: 'https://picsum.photos/seed/m4/400/300', title: '북 노트', description: '올해의 문장들', author: '진' },
];

const Home: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const buttons: string[] = ['캐릭터 챗', '웹 소설', '유저 노트'];

    const handleClick = (index: number): void => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    // 외부 클릭 감지 → 검색창 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearch(false);
            }
        };
        if (showSearch) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSearch]);

    const renderCard = (item: CardItem) => (
        <div className="card" key={item.id}>
            <img src={item.image} alt={item.title} className="card-image" />
            <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.description}</p>
                <p className="card-author">{item.author}</p>
            </div>
        </div>
    );

    // 가로 스크롤용 카드(고정 너비)
    const renderCardH = (item: CardItem) => (
        <div className="card card--h" key={item.id}>
            <img src={item.image} alt={item.title} className="card-image" />
            <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.description}</p>
                <p className="card-author">{item.author}</p>
            </div>
        </div>
    );

    let content: React.ReactNode;
    switch (activeIndex) {
        case 0:
            content = (
                <>
                    <section className="section recommend-character-chat"></section>
                    <section className="section public-favorite-choice"></section>
                    <section className="section otherGenre"></section>
                    <section className="section All-chat"></section>
                </>
            );
            break;
        case 1:
            content = (
                <>
                    <section className="section recommend-web-novel"></section>
                    <section className="section public-favorite-novel"></section>
                    <section className="section recommend-taste"></section>
                    <section className="section All-web-novel"></section>
                </>
            );
            break;
        case 2:
            content = (
                <>
                    <section className="section recommend-userNote"></section>
                    <section className="section genre-popular-note"></section>
                    <section className="section genre-romance"></section>
                    <section className="section all-user-note"></section>
                </>
            );
            break;
        default:
            content = (
                <div>
                    {/* 배너 */}
                    <section className="section banner">
                        <img
                            src="https://picsum.photos/seed/banner1/400/200"
                            alt="Banner"
                            className="banner-image"
                        />
                        <div className="banner-overlay">
                            <p className="banner-hashtag">#계략계</p>
                            <h2 className="banner-title">서도겸</h2>
                            <p className="banner-desc">안하무인, 막무가내. 목숨 걸고 사는 학교의 유...</p>
                        </div>
                    </section>

                    {/* 유저들이 좋아한 채팅 */}
                    <section className="section">
                        <h2 className="section-title">위프 유저들이 가장 좋아한 채팅</h2>
                        <div className="top-users">
                            {TOP_USERS.map((u) => (
                                <div className="top-user" key={u.id}>
                                    <img src={u.image} alt={u.name} className="avatar" />
                                    <span className="avatar-name">{u.name}</span>
                                </div>
                            ))}
                        </div>
                        <button className="primary-btn">그 사람이 누군지 알아보러 가기</button>
                    </section>

                    {/* 많이 본 소설 - 가로 스크롤 */}
                    <section className="section">
                        <div className="title-row">
                            <h2 className="section-title accent">#공공</h2>
                            <h2 className="section-title accent1">좋아하는 사람들이 많이 본 소설</h2>
                        </div>
                        <div className="hscroll">
                            {HOME_NOVELS.slice(0, 4).map(renderCardH)}
                        </div>
                    </section>

                    {/* 유저노트 - 가로 스크롤 */}
                    <section className="section">
                        <h2 className="section-title">새로운 세계로 떠나는 유저노트</h2>
                        <div className="hscroll">
                            {HOME_NOTES.slice(0, 4).map(renderCardH)}
                        </div>
                    </section>
                </div>
            );
    }

    return (
        <div className="Home-container">
            <div className="scroll-area">
                <section className="section title">
                    <div className="appTitle">WHIF</div>
                    <div ref={searchRef} className="search-container">
                        {showSearch ? (
                            <input
                                type="text"
                                className="search-input"
                                placeholder="검색어를 입력하세요."
                                autoFocus
                            />
                        ) : (
                            <SearchIcon
                                className="searchIcon"
                                onClick={() => setShowSearch(true)}
                            />
                        )}
                    </div>
                </section>

                <section className="section chip">
                    <div className="chip-button">
                        {buttons.map((label, index) => (
                            <button
                                key={index}
                                type="button"
                                className={activeIndex === index ? 'active' : ''}
                                onClick={() => handleClick(index)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </section>

                {content}
            </div>
            <NavBar />
        </div>
    );
};

export default Home;