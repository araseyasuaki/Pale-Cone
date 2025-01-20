// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// 環境変数からSupabaseのURLとAPIキーを取得
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabaseクライアントを作成
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
