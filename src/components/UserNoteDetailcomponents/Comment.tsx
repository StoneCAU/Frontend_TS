
import React from 'react';
import { MoreHorizontalIcon, ThumbsUpIcon, MessageCircleIcon } from '../icons';

interface CommentProps {
    isBest: boolean;
    author: string;
    time: string;
    content: string;
    likes: number;
    replies: number;
}

const Comment: React.FC<CommentProps> = ({ isBest, author, time, content, likes, replies }) => {
    return (
        <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex-shrink-0"></div>
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center space-x-2">
                            {isBest && <span className="bg-[#8A4DFF] text-white text-xs font-bold px-2 py-0.5 rounded">BEST</span>}
                            <span className="font-semibold text-white">{author}</span>
                            <span className="text-gray-500 text-sm">· {time}</span>
                        </div>
                        <p className="mt-2 text-gray-300 text-[15px]">{content}</p>
                    </div>
                    <button className="text-gray-500">
                        <MoreHorizontalIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="mt-3 flex items-center space-x-4 text-gray-500">
                    <button className="flex items-center space-x-2 hover:text-white transition-colors p-2 -ml-2 rounded-md">
                        <ThumbsUpIcon className="w-5 h-5" />
                        <span>{likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-white transition-colors p-2 -ml-2 rounded-md">
                        <MessageCircleIcon className="w-5 h-5" />
                        <span>{replies}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Comment;