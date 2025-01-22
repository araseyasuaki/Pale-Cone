import { NextResponse } from 'next/server';
import supabase from '../../libs/supabase';

export async function GET() {
  try {
    // サービスロールキーでデータを取得
    const { data, error } = await supabase
      .from('students')
      .select('*');

    if (error) {
      throw error;
    }

    // データが取得できた場合
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
