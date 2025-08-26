import React from 'react';
import { ArrowLeftIcon, MoreVerticalIcon } from '../components/icons';

type MyNote = {
  id: number;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
};

type LikedNote = {
  id: number;
  title: string;
  description: string;
  author: string; // @handle
};

const MY_NOTES: MyNote[] = [
  {
    id: 1,
    title: '불도저 고백',
    description:
      '고백이라고 외치면 발동. {{user}}이 {{char}}의 손목을 거칠게 붙잡아 벽에 밀어붙인다. 숨이 가빠져지자 {...}',
    date: '2025-08-25',
  },
];

const LIKED_NOTES: LikedNote[] = [
  {
    id: 1,
    title: '금단의 기숙사',
    description:
      '남학생들만 있는 남자 기숙사에 모든 친목 행위는 규칙 위반! 발각 시 기숙사에서 퇴출됩니다. 긴장감 속 사랑...',
    author: '@Mischievous_Fox',
  },
  {
    id: 2,
    title: '사이버펑크 네오 서울',
    description:
      '2077년, 네오 서울. 당신은 불법 개조 시술을 받은 사이보그가 되어 도시의 어두운 이면에 맞서 싸웁니다.',
    author: '@whif_official',
  },
  {
    id: 3,
    title: '로맨틱 코미디 톤',
    description:
      '로맨틱 코미디 톤 기반의 규칙 모음. 대화가 과장되거나 왜곡되지 않게 도와주고, 캐릭터 감정과 사건 전개가...',
    author: '@floea',
  },
];

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-[16px] font-bold text-[#FFF] mb-3">{children}</h2>
);

const KebabButton: React.FC = () => (
  <button
    aria-label="더보기"
    className="absolute top-3 mt-[6px] ml-[270px] flex items-center justify-center bg-[rgba(217,200,239,0.03)] border-none"
  >
    <MoreVerticalIcon className="w-[20px] h-[20px] text-[#FFF]" />
  </button>
);

const MyNoteCard: React.FC<{ note: MyNote }> = ({ note }) => (
  <div className="relative w-full box-border h-[124px] bg-[rgba(217,200,239,0.03)] rounded-[12px] px-[25px] shadow-lg">
    <KebabButton />
    <h3 className="text-[#FFF] font-normal text-[15px] mb-1">{note.title}</h3>
    <p className="text-[13px] text-[rgba(223,225,234,0.61)] leading-snug line-clamp-2">
      {note.description}
    </p>
    <div className="mt-3 inline-flex items-center rounded-[6px]] bg-[rgba(69,74,85,0.32)] text-[#9CA3AF] text-[12px] px-3 py-1">
      {note.date}
    </div>
  </div>
);

const LikedNoteCard: React.FC<{ note: LikedNote }> = ({ note }) => (
  <div className="relative w-full box-border h-[124px] bg-[rgba(217,200,239,0.03)] rounded-[12px] px-[25px] shadow-lg">
    <KebabButton />
    <h3 className="text-[#FFF] font-normal text-[15px] mb-1">{note.title}</h3>
    <p className="text-[13px] text-[rgba(223,225,234,0.61)] leading-snug line-clamp-2">
      {note.description}
    </p>
    <div className="mt-3 inline-flex items-center rounded-[6px] bg-[rgba(69,74,85,0.32)] text-[#9CA3AF] text-[12px] px-3 py-1">
      {note.author}
    </div>
  </div>
);

const ChattingUserNote: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* 앱 프레임 */}
      <div className="w-[375px] h-[896px] bg-[#141924] text-gray-200 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <header className="flex-shrink-0 flex items-center h-[34px] mt-[24px] px-[20px]">
          <button className="p-2 ml-[4px] bg-[#141924] border-none" aria-label="뒤로가기">
            <ArrowLeftIcon className="w-[20px] h-[20px] text-[#FFF]" />
          </button>
          <h1 className="ml-[8px] text-[18px] font-bold text-[#FFF]">유저노트</h1>
        </header>

        {/* 본문 스크롤 영역 */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="w-[335px] mx-auto pt-4 pb-24 space-y-6">
            {/* 내가 만든 유저노트 */}
            <section className="mt-[25px]">
              <SectionTitle>내가 만든 유저노트</SectionTitle>
              <div className="space-y-3">
                {MY_NOTES.map(n => (
                  <MyNoteCard key={n.id} note={n} />
                ))}
              </div>
            </section>

            {/* 좋아요한 유저노트 */}
            <section className="mt-[45px]">
              <SectionTitle>좋아한 유저노트</SectionTitle>
              <div className="space-y-3">
                {LIKED_NOTES.map(n => (
                  <LikedNoteCard key={n.id} note={n} />
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* 하단 고정 버튼 */}
        <footer className="pointer-events-none">
          <div className="pointer-events-auto mb-[15px]">
            <div className="w-[335px] mx-auto py-3 flex gap-3">
              <button
                className="flex-1 h-[52px] mr-[10px] border-none rounded-[12px] bg-[#222A39] text-[#FFF] font-semibold"
                type="button"
              >
                생성하기
              </button>
              <button
                className="flex-1 h-[52px] rounded-[12px] bg-[#6F4ACD] text-[#FFF] font-semibold opacity-70"
                type="button"
                disabled
              >
                적용하기
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChattingUserNote;