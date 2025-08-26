import React from "react";
import { BookmarkIcon } from "../icons";

interface Props { bookmarkCount: number; }

const UserNoteDetailFooter: React.FC<Props> = ({ bookmarkCount }) => {
    return (
        <footer className="h-[79px] flex-shrink-0 bg-[#141924]">
            <div className="w-[355px] mx-auto py-4 flex items-center gap-4">
                <button className="mt-[13px] flex flex-col items-center hover:text-white rounded-[12px] bg-[#222A39] border border-[#222A39]">
                    <BookmarkIcon className="w-[50px] h-[32px] text-[#FFF]" />
                    <span className="text-xs text-[#FFF] font-semibold">{bookmarkCount}</span>
                </button>

                <button
                    className="w-[281px] h-[52px] ml-auto mt-[13px] 
             bg-[#6F4ACD] border border-[#6F4ACD] 
             text-[#FFF] font-bold 
             px-8 rounded-[12px] text-[15px] 
             inline-flex items-center justify-center"
                >
                    적용하기
                </button>

            </div>
        </footer>
    );
};

export default UserNoteDetailFooter;