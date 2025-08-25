
import React from 'react';

interface TagProps {
    text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <span className="bg-[#454A55] text-[##F3F4F6] text-[14px] font-medium px-5 py-2 rounded-[6px]">
            {text}
        </span>
    );
};

export default Tag;