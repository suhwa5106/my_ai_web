import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

const USER_STORAGE_KEY = 'community_user';

/**
 * AuthProvider 컴포넌트
 *
 * Props:
 * @param {React.ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <AuthProvider><App /></AuthProvider>
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (username, password, nickname) => {
    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single();

      if (existingUser) {
        return { data: null, error: { message: '이미 존재하는 아이디입니다.' } };
      }

      const { data, error } = await supabase
        .from('users')
        .insert([{ username, password, nickname }])
        .select()
        .single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: '회원가입 중 오류가 발생했습니다.' } };
    }
  };

  const signIn = async (username, password) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        return { data: null, error: { message: '아이디 또는 비밀번호가 올바르지 않습니다.' } };
      }

      setUser(data);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));

      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: '로그인 중 오류가 발생했습니다.' } };
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    return { error: null };
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
