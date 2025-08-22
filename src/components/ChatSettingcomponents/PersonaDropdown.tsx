import React, { useEffect, useRef, useState } from "react";

export interface PersonaOption {
    id: string;
    label: string;
}

interface PersonaDropdownProps {
    id?: string;
    value: string;                            // 선택된 id 또는 직접입력 텍스트
    onChange: (idOrText: string) => void;     // 선택/입력 변경 콜백
    options: PersonaOption[];
    placeholder?: string;

    // 직접입력 제어
    customId?: string;                        // 기본값: 'custom'
    customValue?: string;                     // 입력 중 텍스트 (상위 상태)
    onCustomChange?: (text: string) => void;  // 입력 변경 콜백
}

const PersonaDropdown: React.FC<PersonaDropdownProps> = ({
    id,
    value,
    onChange,
    options,
    placeholder = "페르소나를 선택하세요",
    customId = "custom",
    customValue = "",
    onCustomChange,
}) => {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // 트리거 → 입력 모드
    const [draft, setDraft] = useState<string>("");
    const wrapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 현재 value가 옵션 id인지 확인 (맞으면 label 표시, 아니면 자유 텍스트로 간주)
    const selected = options.find((o) => o.id === value) || null;
    const isFreeText = !selected && value.length > 0;

    // 바깥 클릭 → 닫기/확정
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapRef.current) return;
            if (!wrapRef.current.contains(e.target as Node)) {
                setOpen(false);
                if (isEditing) commitOrCancel();
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing, draft, customValue, value]);

    // 입력모드 진입 시 포커스
    useEffect(() => {
        if (isEditing) {
            const t = setTimeout(() => inputRef.current?.focus(), 0);
            return () => clearTimeout(t);
        }
    }, [isEditing]);

    const onTriggerKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };

    const handleSelect = (nextId: string) => {
        if (nextId === customId) {
            // 직접입력 모드로 전환
            setOpen(false);
            setIsEditing(true);
            setDraft(""); // 새 입력
            return;
        }
        // 일반 옵션 선택
        onChange(nextId);
        setOpen(false);
        setIsEditing(false);
    };

    const onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") {
            commit();
        } else if (e.key === "Escape") {
            cancel();
        }
    };

    const commit = () => {
        const text = (draft ?? customValue ?? "").trim();
        if (text) {
            onChange(text); // 자유 텍스트 확정
            onCustomChange?.(text); // 상위에도 반영(선택)
        } else {
            // 빈 값이면 선택 초기화
            onChange("");
            onCustomChange?.("");
        }
        setIsEditing(false);
    };

    const cancel = () => {
        setIsEditing(false);
        // 값이 아예 없거나 'custom' 상태만 유지 중이면 초기화
        if (!value || value === customId) {
            onChange("");
        }
    };

    const commitOrCancel = () => {
        const text = (draft ?? customValue ?? "").trim();
        if (text) commit();
        else cancel();
    };

    return (
        <div ref={wrapRef} className="cs-dd">
            {/* 트리거: 기본/자유텍스트/선택된 레이블 */}
            {!isEditing ? (
                <button
                    id={id}
                    type="button"
                    className={`cs-dd-trigger ${open ? "is-open" : ""}`}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    onKeyDown={onTriggerKeyDown}
                >
                    <span className={`cs-dd-value ${selected || isFreeText ? "" : "is-placeholder"}`}>
                        {selected ? selected.label : (isFreeText ? value : placeholder)}
                    </span>
                    <span className="cs-dd-caret" aria-hidden>▾</span>
                </button>
            ) : (
                // 입력 모드: 같은 트리거 박스 안에 input 표시 (디자인 유지)
                <div className="cs-dd-trigger is-open" aria-expanded={true}>
                    <input
                        ref={inputRef}
                        id={id}
                        type="text"
                        className="cs-dd-input"
                        placeholder="원하는 페르소나를 입력하세요"
                        value={draft}
                        onChange={(e) => {
                            setDraft(e.target.value);
                            onCustomChange?.(e.target.value);
                        }}
                        onKeyDown={onInputKeyDown}
                        onBlur={commitOrCancel}
                    />
                    <span className="cs-dd-caret" aria-hidden>▾</span>
                </div>
            )}

            {/* 드롭다운 메뉴 (입력 모드일 때는 숨김) */}
            {open && !isEditing && (
                <div className="cs-dd-menu" role="listbox" aria-labelledby={id}>
                    {options.map((opt) => {
                        const active = opt.id === value; // value가 옵션 id면 active
                        return (
                            <div
                                key={opt.id}
                                role="option"
                                aria-selected={active}
                                tabIndex={0}
                                className={`cs-dd-item ${active ? "is-active" : ""}`}
                                onClick={() => handleSelect(opt.id)}
                                onKeyDown={(e) => (e.key === "Enter" ? handleSelect(opt.id) : undefined)}
                            >
                                <span className="cs-dd-item-label">{opt.label}</span>
                                {active && <span className="cs-dd-check" aria-hidden>✓</span>}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PersonaDropdown;
