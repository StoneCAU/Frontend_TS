// src/pages/ChatSetting.tsx
import React, { useState } from 'react';
import './ChatSetting.css';
import { InputWithCounter } from '../../components/InputWithCounter';
import { RadioGroup } from '../../components/RadioGroup';
import { ArrowLeftIcon } from '../../components/icons/leftArrow';
import PersonaDropdown from '../../components/PersonaDropdown';
import BottomSheet from '../../components/BottomSheet';

const GENDER_OPTIONS = [
    { id: 'male', label: '남성' },
    { id: 'female', label: '여성' },
    { id: 'none', label: '설정하지 않음' },
];

const ChatSetting: React.FC = () => {
    // ✅ 드롭다운에서 고른 값(백도하/소유현/custom)과 커스텀 텍스트를 분리 관리
    const [personaChoice, setPersonaChoice] = useState<string>('');
    const [personaText, setPersonaText] = useState<string>('');

    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [introduction, setIntroduction] = useState('');
    const [userNote, setUserNote] = useState('');

    const [sheetOpen, setSheetOpen] = useState(false);
    // 최종 사용할 페르소나
    const effectivePersona = personaChoice === 'custom' ? personaText : personaChoice;

    const handleSubmit = () => {
        if (personaChoice === 'custom' && !personaText.trim()) {
            alert('페르소나를 입력해주세요.');
            return;
        }
        // TODO: 서버 전송/상태 저장 등 처리
        console.log('최종 페르소나:', effectivePersona);
    };

    return (
        <div className="cs-root">
            {/* 앱 프레임 (Home과 동일 규격) */}
            <div className="cs-app">
                {/* 헤더 */}
                <header className="cs-titlebar">
                    <div className="cs-titlerow">
                        <button className="cs-backbtn" aria-label="뒤로가기">
                            <ArrowLeftIcon className="cs-backicon" />
                        </button>
                        <h1 className="cs-title">채팅 설정</h1>
                    </div>
                </header>

                {/* 본문 스크롤 영역 */}
                <main className="cs-scroll">
                    <div className="cs-section">
                        {/* 페르소나 */}
                        <div className="cs-field">
                            <label htmlFor="persona" className="cs-label">페르소나</label>
                            <PersonaDropdown
                                id="persona"
                                value={personaChoice}
                                onChange={setPersonaChoice}
                                options={[
                                    { id: '백도하', label: '백도하' },
                                    { id: '소유현', label: '소유현' },
                                    { id: 'custom', label: '직접 입력' },
                                ]}
                                placeholder="페르소나를 선택하세요"
                                customId="custom"
                                customValue={personaText}
                                onCustomChange={setPersonaText}
                            />
                        </div>

                        {/* 이름 */}
                        <InputWithCounter
                            id="name"
                            label="이름"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={20}
                            placeholder="20자 이내로 입력해주세요"
                            required
                        />

                        {/* 성별 */}
                        <RadioGroup
                            label="성별"
                            name="gender"
                            options={GENDER_OPTIONS}
                            selectedValue={gender}
                            onChange={(value) => setGender(value)}
                            required
                        />

                        {/* 소개 */}
                        <InputWithCounter
                            id="introduction"
                            label="소개"
                            value={introduction}
                            onChange={(e) => setIntroduction(e.target.value)}
                            maxLength={350}
                            placeholder="캐릭터가 기억해 줬으면 하는 내용을 적어주세요"
                            required
                            isTextarea
                            rows={6}
                        />

                        {/* 유저노트 */}
                        <div className="cs-field">
                            <div className="cs-field-head">
                                <div>
                                    <h2 className="cs-label">유저노트</h2>
                                    <p className="cs-help">유저노트를 이용해서<br /> 더 다양한 대화를 나눌 수 있어요!</p>
                                </div>
                                <button className="cs-btn" type="button" onClick={() => setSheetOpen(true)}>
                                    불러오기
                                </button>
                            </div>
                            {/*
                            <InputWithCounter
                                id="user-note"
                                value={userNote}
                                onChange={(e) => setUserNote(e.target.value)}
                                maxLength={500}
                                placeholder="캐릭터가 기억해 줬으면 하는 내용을 적어주세요"
                                isTextarea
                                rows={6}
                            />
                            */}
                        </div>

                        <div style={{ height: 8 }} />
                    </div>
                </main>

                {/* 하단 버튼 */}
                <footer className="cs-footer">
                    <button
                        type="button"
                        className="cs-primary"
                        onClick={handleSubmit}
                        disabled={personaChoice === 'custom' && !personaText.trim()}
                    >
                        대화하기
                    </button>
                </footer>

                {/* ✅ 바텀시트: 앱 프레임 내부에서 하단 슬라이드 */}
                <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="유저노트">
                    <div className="sheet-card">
                        <div className="sheet-icon" aria-hidden>🗒️</div>
                        <div className="sheet-head">저장한 유저노트가 없어요</div>
                        <ul className="sheet-bullets">
                            <li>유저노트를 적용하면 새로운 세계관에서 대화할 수 있어요</li>
                            <li>인기 유저노트를 둘러보고 마음에 드는 유저노트를 적용해보세요</li>
                        </ul>
                        <button className="sheet-cta" type="button">
                            유저노트 둘러보기
                        </button>
                    </div>
                </BottomSheet>
            </div>
        </div>
    );
};

export default ChatSetting;