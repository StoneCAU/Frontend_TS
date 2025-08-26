import React from 'react';
import { MoreHorizontalIcon, ThumbsUpIcon, MessageCircleIcon } from '../icons';

export interface CommentProps {
    isBest?: boolean;
    author: string;
    time: string;
    content: string;
    likes: number;
    replies: number;
    avatarUrl?: string;
    onMoreClick?: () => void;
    onLikeClick?: () => void;
    onReplyClick?: () => void;
}

const Comment: React.FC<CommentProps> = ({
    isBest,
    author,
    time,
    content,
    likes,
    replies,
    avatarUrl,
    onMoreClick,
    onLikeClick,
    onReplyClick,
}) => {
    return (
        <div className="flex items-start gap-3 py-4">

            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-[#2D3340] flex items-center justify-center flex-shrink-0">

                    <svg
                        className="w-6 h-6 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                    >
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                </div>
            )}

            <div className="flex-1">
                <div className="flex items-start justify-between gap-2 ml-[10px]">
                    <div>
                        <div className="flex items-center gap-2">
                            {isBest && (
                                <span className="flex items-center justify-center w-[42px] h-[23px] rounded-[6px] bg-[#8A4DFF] text-[12px] font-bold text-white">
                                    BEST
                                </span>
                            )}

                            <span className="text-[14px] font-semibold text-[#8B90A3] ml-[15px]">{author}</span>
                            <span className="text-[13px] text-[#8B90A3] ml-[10px]">· {time}</span>
                        </div>

                        <p className="mt-2 text-[15px] leading-[22px] text-[#D6DAE6]">
                            {content}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onMoreClick}
                        aria-label="더보기"
                        className="inline-flex items-center justify-center w-[40px] h-[40px]
             text-[#FFF] bg-transparent focus:outline-none focus:ring-0 border-0"
                    >
                        <MoreHorizontalIcon className="h-[25px] w-[25px] rotate-90" />
                    </button>

                </div>

                <div className="mt-3 flex items-center gap-3 ml-[10px]">
                    <button
                        type="button"
                        onClick={onLikeClick}
                        className="inline-flex items-center gap-2 rounded-[6px] bg-[#2F3440] px-3 py-2 text-[13px] text-[#C9CEDB] hover:bg-[#383E4D] mr-[5px] border-0 focus:outline-none focus:ring-0"
                    >
                        <ThumbsUpIcon className="h-[20px] w-[20px] text-[#C9CEDB] mr-[5px]" />
                        <span>{likes}</span>
                    </button>

                    <button
                        type="button"
                        onClick={onReplyClick}
                        className="inline-flex items-center gap-2 rounded-[6px] bg-[#2F3440] px-3 py-2 text-[13px] text-[#C9CEDB] hover:bg-[#383E4D] border-0 focus:outline-none focus:ring-0"
                    >
                        <MessageCircleIcon className="h-[20px] w-[20px] text-[#C9CEDB] mr-[5px]" />
                        <span>{replies}</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Comment;