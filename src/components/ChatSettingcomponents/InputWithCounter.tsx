import React from 'react';

interface InputWithCounterProps {
    id: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    maxLength: number;
    placeholder: string;
    required?: boolean;
    isTextarea?: boolean;
    rows?: number;
}

export const InputWithCounter: React.FC<InputWithCounterProps> = ({
    id, label, value, onChange, maxLength, placeholder,
    required = false, isTextarea = false, rows = 4,
}) => {
    const InputComponent: any = isTextarea ? 'textarea' : 'input';

    return (
        <div className="cs-field">
            {label && (
                <label htmlFor={id} className="cs-label">
                    {label}{required && <span style={{ color: '#ef4444', marginLeft: 4 }}>*</span>}
                </label>
            )}
            <div className="cs-inputwrap">
                <InputComponent
                    id={id}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    rows={isTextarea ? rows : undefined}
                    className={isTextarea ? 'cs-textarea' : 'cs-input'}
                />
                <div className="cs-counter">{value.length}/{maxLength}</div>
            </div>
        </div>
    );
};
