import React from 'react';

interface RadioOption { id: string; label: string; }

interface RadioGroupProps {
    label: string;
    name: string;
    options: RadioOption[];
    selectedValue: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    label, name, options, selectedValue, onChange, required = false,
}) => {
    return (
        <div className="cs-field">
            <label className="cs-label">
                {label}{required && <span style={{ color: '#ef4444', marginLeft: 4 }}>*</span>}
            </label>
            <div className="cs-radiogroup">
                {options.map((option) => (
                    <label key={option.id} className="cs-radio">
                        <input
                            type="radio"
                            name={name}
                            value={option.id}
                            checked={selectedValue === option.id}
                            onChange={(e) => onChange(e.target.value)}
                        />
                        <span className="cs-radio-visual">
                            <span className="cs-radio-dot" />
                        </span>
                        <span className="cs-radio-label">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
