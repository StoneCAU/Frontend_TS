import React, { useEffect, useState } from 'react';
import './ChatSetting.css';
import { InputWithCounter } from '../../components/ChatSettingcomponents/InputWithCounter';
import { RadioGroup } from '../../components/ChatSettingcomponents/RadioGroup';
import { ArrowLeftIcon } from '../../components/icons';
import PersonaDropdown from '../../components/ChatSettingcomponents/PersonaDropdown';
import BottomSheet from '../../components/ChatSettingcomponents/BottomSheet';
import { useSearchParams } from 'react-router-dom';

const GENDER_OPTIONS = [
  { id: 'male', label: '남성' },
  { id: 'female', label: '여성' },
  { id: 'none', label: '설정하지 않음' },
];

// 최소 타입
type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};
type PersonaListItem = { personaId: number; name: string };
type PersonaDetail = {
  personaId: number;
  name: string;
  gender: 'MALE' | 'FEMALE' | string;
  persona: string; // 소개
};

const ChatSetting: React.FC = () => {
  // characterId 저장만
  const [params] = useSearchParams();
  const [characterId, setCharacterId] = useState<string>('');
  useEffect(() => {
    const id = params.get('characterId') ?? '';
    setCharacterId(id);
  }, [params]);

  // 페르소나 드롭다운
  const [personaChoice, setPersonaChoice] = useState<string>('custom'); // 기본값을 'custom'으로 설정
  const [personaText, setPersonaText] = useState<string>('');
  const [personaOptions, setPersonaOptions] = useState<{ id: string; label: string }[]>([
    { id: 'custom', label: '직접 입력' },
  ]);

  // 폼
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'none'>('male');
  const [introduction, setIntroduction] = useState('');
  const [userNote, setUserNote] = useState('');

  const [sheetOpen, setSheetOpen] = useState(false);
  const effectivePersona = personaChoice === 'custom' ? personaText : personaChoice;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  // 페르소나 목록 호출 - 실패해도 무시하고 진행
  useEffect(() => {
    // /persona 엔드포인트가 403이므로 아예 호출하지 않음
    // 기본 "직접 입력" 옵션만 사용
    console.log('페르소나 API 호출 생략 - 직접 입력 모드로 진행');
  }, [API_BASE_URL]);

  // 성별 매핑
  const mapGender = (g?: string): 'male' | 'female' | 'none' => {
    if (g === 'MALE') return 'male';
    if (g === 'FEMALE') return 'female';
    return 'none';
  };

  // 페르소나 선택 시 상세 호출 - 직접 입력만 지원
  const handlePersonaChange = async (value: string) => {
    setPersonaChoice(value);
    if (value === 'custom' || value === '') return;

    // 서버의 페르소나는 사용할 수 없으므로 직접 입력으로 안내
    console.log('페르소나 상세 API 생략 - 직접 입력 모드');
  };

  const handleSubmit = () => {
    if (personaChoice === 'custom' && !personaText.trim()) {
      alert('페르소나를 입력해주세요.');
      return;
    }
    
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    
    if (!introduction.trim()) {
      alert('소개를 입력해주세요.');
      return;
    }
    
    console.log('채팅 설정 완료:', { 
      characterId, 
      effectivePersona, 
      name, 
      gender, 
      introduction, 
      userNote 
    });
    
    // 실제 채팅 페이지로 이동 또는 다른 처리
  };

  return (
    <div className="cs-root">
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

        <main className="cs-scroll">
          <div className="cs-section">
            {/* 페르소나 - 직접 입력만 지원 */}
            <div className="cs-field">
              <label htmlFor="persona" className="cs-label">페르소나</label>
              <PersonaDropdown
                id="persona"
                value={personaChoice}
                onChange={handlePersonaChange}
                options={personaOptions}
                placeholder="직접 입력을 선택하세요"
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
              onChange={(v) => setGender(v as 'male' | 'female' | 'none')}
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

            {/* 유저노트(원형 유지) */}
            <hr className="border-t border-[#283143] my-4" />
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
            disabled={
              (personaChoice === 'custom' && !personaText.trim()) ||
              !name.trim() ||
              !introduction.trim()
            }
          >
            대화하기
          </button>
        </footer>

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