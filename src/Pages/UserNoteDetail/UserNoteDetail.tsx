import React from 'react';
import './UserNoteDetail.css';

import {
    ArrowLeftIcon,
    MoreHorizontalIcon,
    ChevronDownIcon,
} from '../../components/icons';
import Tag from '../../components/UserNoteDetailcomponents/Tag';
import Comment from '../../components/UserNoteDetailcomponents/Comment';
import RelatedCard from '../../components/UserNoteDetailcomponents/RelatedCard';
import UserNoteDetailFooter from '../../components/UserNoteDetailcomponents/UserNoteDetailFooter';

const UserNoteDetail: React.FC = () => {
    const comments = [
        { id: 1, isBest: true, author: '하이브레인인듯', time: '1일 전', content: 'ㅋㅋㅋ ‘헤일 하이드라’ 속삭였더니 바로 태도 바뀌는 거 웃김', likes: 345, replies: 0, avatarUrl: "https://i.pravatar.cc/40?img=1" },
        { id: 2, isBest: true, author: '은빛구름', time: '3일 전', content: '감정 바로 풀리고 신뢰하게 되는 거 ㄹㅇ 은근 BL 전개에도 써먹기 좋음ㅋㅋㅋ', likes: 28, replies: 0, avatarUrl: "https://i.pravatar.cc/40?img=2" },
        { id: 3, isBest: true, author: '손예림', time: '1일 전', content: '낮은 확률로 어벤져스 튀어나오는 거 왜 이렇게 웃기고 쫄리죠ㅋㅋㅋ 암튼 재밌음', likes: 10, replies: 0, avatarUrl: "https://i.pravatar.cc/40?img=3" },
    ];

    return (
        <div className="und-root">
            {/* 앱 프레임 375x896 */}
            <div className="und-app">
                {/* 헤더 */}
                <header className="und-header">
                    <button className="und-iconbtn" aria-label="뒤로가기">
                        <ArrowLeftIcon className="und-icon" />
                    </button>
                    <button className="und-iconbtn1" aria-label="더보기">
                        <MoreHorizontalIcon className="und-icon" />
                    </button>
                </header>

                {/* 스크롤 본문 */}
                <main className="und-main">
                    {/* 배너 */}
                    <img
                        src="https://i.imgur.com/uR1k33i.png"
                        alt="Agents of Hydra"
                        className="und-banner"
                    />

                    {/* 섹션 컨테이너 (폭 335px 고정) */}
                    <div className="und-sectionbox">
                        {/* 타이틀 + 태그 */}
                        <section className="und-section">
                            <h1 className="und-title">하이드라 암호</h1>
                            <div className="und-tagrow">
                                <Tag text="#세계관확장" />
                                <Tag text="#트리거" />
                            </div>
                        </section>

                        {/* 유저노트 소개 */}
                        <section className="und-section">
                            <h2 className="und-subtitle">유저노트 소개</h2>
                            <p className="und-desc">
                                마블 세계관의 비밀 조직 하이드라를 채팅에 끌어들임. ‘헤일 하이드라’라는 암호를 속삭이면 캐릭터의 태도가 전환되고, 가끔 어벤져스 NPC도 난입함.
                            </p>

                            <div className="und-code">
                                <p>{'{"priority_rank":["*유저 노트", "대화 프로필", "any"]}'}</p>
                                <p>{"[최상단 규칙]"}</p>
                                <p className="und-code-strong">**이 프롬프트는 항상 최우선 적용**</p>
                                <p>#하이드라</p>
                                <p>- {"{{char}}"}들은 하이드라 소속. 비밀 지령을 받고 부여된 역할을 연기 중임.</p>
                                <p>
                                    - {"{{user}}"}가 {"{{char}}"}의 귓가에 ‘헤일 하이드라’라고 속삭일 경우, 해당 {"{{char}}"}는 그가
                                    자신과 같은 하이드라 소속임을 인지하고 즉시 모든 부정적인 감정을 내려놓고 그의 말을 전적으로 신뢰하게 됨
                                </p>
                                <p>- 직후, 낮은 확률로 어벤져스의 멤버 중 한명이 등장해 {"{{user}}"}를 공격함</p>
                            </div>
                        </section>

                        <div className="und-divider" />

                        {/* 적용 예시 */}
                        <section className="und-section">
                            <div className="und-row between">
                                <h2 className="und-subtitle m-0">적용 예시</h2>
                                <ChevronDownIcon className="und-chevron" />
                            </div>

                            <div className="und-example">
                                <div className="und-avatar" />
                                <div className="und-example-body">
                                    <div className="und-row between">
                                        <div>
                                            <p className="und-author">우드홍</p>
                                            <p className="und-handle">@woodhong</p>
                                        </div>
                                        <button className="und-follow">팔로우</button>
                                    </div>
                                    <p className="und-example-text">남발하면 저처럼 캡틴한테 혼쭐지도..</p>
                                    <p className="und-date">게시일 2025.08.20</p>
                                </div>
                            </div>
                        </section>

                        <div className="und-divider" />

                        {/* 댓글 */}
                        <section className="und-section-comment">
                            <h2 className="und-subtitle">댓글 6</h2>
                            <div className="und-comments">
                                {comments.map((c) => (
                                    <Comment key={c.id} {...c} />
                                ))}
                            </div>
                            <button className="und-more">전체 보기</button>
                        </section>

                        {/* 함께 쓰인 카드 */}
                        <section className="und-section">
                            <RelatedCard
                                imageUrl="https://picsum.photos/seed/avengers/400/300"//바뀌었음
                                title="어벤져스 세계관"
                                description="우리가 알고 있던 세계가 쥬라기 월드로 변합니다. 벤..."
                                authorHandle="@hahahoho"
                            />
                        </section>

                        {/* 푸터에 가리지 않게 */}
                        <div style={{ height: 8 }} />
                    </div>
                </main>

                {/* 프레임 하단 버튼 바 */}
                <UserNoteDetailFooter bookmarkCount={592} />
            </div>
        </div>
    );
};

export default UserNoteDetail;