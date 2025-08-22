import React from 'react';

interface RelatedCardProps {
    imageUrl: string;
    title: string;
    description: string;
    authorHandle: string;
}

const RelatedCard: React.FC<RelatedCardProps> = ({ imageUrl, title, description, authorHandle }) => {
    return (
        <div>
            <h2 className="text-lg font-bold text-white mb-4">이 유저노트와 같이 쓰였어요</h2>
            <div className="flex items-center space-x-4 bg-[#25262d] p-3 rounded-lg">
                <img src={imageUrl} alt={title} className="w-24 h-24 object-cover rounded-md" />
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