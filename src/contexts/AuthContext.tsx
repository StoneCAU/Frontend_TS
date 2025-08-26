// src/contexts/AuthContext.tsx - 실제 작동하는 버전
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { ApiResponse } from '../types/api';

interface User {
    id: string;
    name: string;
    email?: string;
    nickname?: string;
    profileImage?: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
    login: (token: string, userData?: User) => void;
    logout: () => void;
    checkSession: () => Promise<boolean>;
    isSessionChecking: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isSessionChecking, setIsSessionChecking] = useState<boolean>(true);

    // 세션 체크 함수
    const checkSession = async (): Promise<boolean> => {
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            console.log('세션 체크 시작...');
            
            const response = await fetch(`${API_BASE_URL}/member/me`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('세션 체크 응답:', response.status, response.ok);

            if (response.ok) {
                const data: ApiResponse<User> = await response.json();
                console.log('세션 체크 데이터:', data);
                
                if (data.isSuccess && data.result) {
                    setUser(data.result);
                    setIsLoggedIn(true);
                    setToken(null); // 쿠키 기반이므로 토큰은 null
                    console.log('세션 유효 - 로그인 상태 설정');
                    return true;
                }
            }

            // 세션 무효
            console.log('세션 무효 - 로그아웃 상태 설정');
            setUser(null);
            setIsLoggedIn(false);
            setToken(null);
            return false;

        } catch (error) {
            console.error('세션 체크 실패:', error);
            setUser(null);
            setIsLoggedIn(false);
            setToken(null);
            return false;
        }
    };

    // 카카오 로그인 콜백 처리
    useEffect(() => {
        const handleKakaoCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            
            console.log('URL 파라미터 확인:', { 
                hasCode: !!code, 
                fullUrl: window.location.href 
            });
            
            if (code) {
                console.log('카카오 로그인 콜백 감지, code:', code.substring(0, 10) + '...');
                
                try {
                    // URL 정리 먼저
                    window.history.replaceState({}, document.title, window.location.pathname);
                    console.log('URL 파라미터 정리 완료');
                    
                    // 서버가 이미 카카오 로그인을 처리했으므로 바로 세션 체크
                                        
                    console.log('카카오 로그인 후 서버에서 리다이렉트됨, 세션 체크 시작');
                    
                    // 서버에서 이미 로그인 처리가 완료되었으므로 바로 세션 체크
                    setTimeout(async () => {
                        const sessionValid = await checkSession();
                        setIsSessionChecking(false);
                        console.log('카카오 로그인 후 세션 체크 결과:', sessionValid);
                        
                        if (sessionValid) {
                            // returnUrl 처리
                            const returnUrl = sessionStorage.getItem('returnUrl');
                            if (returnUrl) {
                                sessionStorage.removeItem('returnUrl');
                                console.log('returnUrl로 리다이렉트:', returnUrl);
                                window.location.href = returnUrl;
                            }
                        }
                    }, 500); // 짧은 대기 시간
                    
                } catch (error) {
                    console.error('카카오 콜백 처리 실패:', error);
                    setIsSessionChecking(false);
                }
            } else {
                // code가 없으면 일반적인 세션 체크
                console.log('일반 세션 체크 실행');
                setTimeout(async () => {
                    await checkSession();
                    setIsSessionChecking(false);
                }, 100);
            }
        };

        handleKakaoCallback();
    }, []);

    const login = (newToken: string, userData?: User) => {
        console.log('수동 로그인 처리');
        setIsLoggedIn(true);
        setToken(null); // 쿠키 기반
        if (userData) {
            setUser(userData);
        }
    };

    const logout = async () => {
        console.log('로그아웃 처리 시작...');
        
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            await fetch(`${API_BASE_URL}/member/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('서버 로그아웃 완료');
        } catch (error) {
            console.error('서버 로그아웃 실패:', error);
        } finally {
            setToken(null);
            setUser(null);
            setIsLoggedIn(false);
            console.log('로그아웃 완료');
        }
    };

    // 상태 변경 로깅
    useEffect(() => {
        console.log('Auth State 변경:', {
            isLoggedIn,
            hasUser: !!user,
            userName: user?.name,
            isSessionChecking,
            timestamp: new Date().toISOString()
        });
    }, [isLoggedIn, user, isSessionChecking]);

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            token, 
            user,
            login, 
            logout, 
            checkSession,
            isSessionChecking 
        }}>
            {children}
        </AuthContext.Provider>
    );
};