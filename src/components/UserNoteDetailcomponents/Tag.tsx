
import React from 'react';

interface TagProps {
    text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <span className="bg-gray-700 text-gray-300 text-sm font-medium px-3 py-1 rounded-full">
            {text}
        </span>
    );
};

export default Tag;