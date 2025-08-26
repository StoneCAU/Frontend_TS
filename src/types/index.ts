export interface ApiResponse<T = any> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

export interface Character {
    characterId: number;
    characterImageUrl: string;
    name: string;
    description: string;
    tags: string[];
}

export interface Story {
    storyId: number;
    storyImageUrl: string;
    title: string;
    description: string;
    author: string;
    characters: Character[];
}

export interface UserNote {
    userNoteId: number;
    userNoteImageUrl: string | null;
    title: string;
    description: string;
    author: string;
}