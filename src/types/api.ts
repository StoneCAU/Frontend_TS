export interface ApiResponse<T = any> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}