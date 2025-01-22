import { createClient } from '@supabase/supabase-js';

// サービスロールキーを使用してSupabaseクライアントを作成
const supabaseUrl = process.env.NEXT_PUBLIC_YELL_SUPABASE_URL;  // SupabaseのURL
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_YELL_SUPABASE_ANON_KEY;  // サービスロールキー

// サーバー側での設定
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default supabase;
