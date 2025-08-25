import React from 'react';
import aven from "./aven.jpg";

interface RelatedCardProps {
    imageUrl: string;
    title: string;
    description: string;
    authorHandle: string;
}

const RelatedCard: React.FC<RelatedCardProps> = ({ imageUrl, title, description, authorHandle }) => {
    return (
        <div>
            <h2 className="text-[19px] font-semibold text-white mb-4">이 유저노트와 같이 쓰였어요</h2>
            <div className="flex flex-col space-x-4 bg-[#141924] p-3 rounded-lg">
                <img src={aven} alt={title} className="w-[150px] h-[120px] object-cover rounded-[12px]" />
                <div className="flex-grow">
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{description}</p>
                    <div className="mt-3">
                        <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-1 rounded">
                            {authorHandle}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedCard;