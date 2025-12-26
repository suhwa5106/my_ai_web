import { createClient } from '@supabase/supabase-js';

/**
 * Supabase 클라이언트 설정
 * 환경변수에서 URL과 ANON_KEY를 가져옴
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
