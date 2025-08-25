import React from 'react';
import aven from "./aven.jpg";

interface RelatedCardProps {
    imageUrl: string;
    title: string;
    description: string;
    authorHandle: string;
}

const RelatedCard: React.FC<RelatedCardProps> = ({ title, description, authorHandle }) => {
    return (
        <div>
            <h2 className="text-[19px] font-semibold text-white mt-[45px]">
                이 유저노트와 같이 쓰였어요
            </h2>

            <div className="flex flex-col space-y-3 bg-[#141924] p-3 rounded-lg">
                <img
                    src={aven}
                    alt={title}
                    className="w-[165px] h-[165px] object-cover rounded-[12px]"
                />

                <div className="flex-grow w-[165px]">
                    <h3 className="font-normal text-white text-[15px]">{title}</h3>
                    <p className="text-[12px] [color:#9CA3AF] mt-1">{description}</p>

                    <div className="w-[60px] mt-3 bg-[#363A43] rounded-[6px] flex justify-center items-center">
                        <span className="inline-block bg-gray-700 [color:#9CA3AF] text-[9px] font-medium px-2 py-1 rounded mb-[3px]">
                            {authorHandle}
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default RelatedCard;