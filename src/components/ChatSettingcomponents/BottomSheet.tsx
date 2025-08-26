import React, { useEffect, useRef } from 'react';

interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ open, onClose, title, children }) => {
    const sheetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        if (open) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    const onOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className={`bs-root ${open ? 'is-open' : ''}`} onClick={onOverlayClick}>
            <div className="bs-sheet" ref={sheetRef} role="dialog" aria-modal="true" aria-label={title || 'Bottom Sheet'}>
                <div className="bs-handle" aria-hidden />
                {title && (
                    <div className="bs-header">
                        <div className="bs-title">{title}</div>
                        <button className="bs-close" aria-label="닫기" onClick={onClose}>✕</button>
                    </div>
                )}
                <div className="bs-body">{children}</div>
            </div>
        </div>
    );
};

export default BottomSheet;