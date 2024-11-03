import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL: string = "https://hgswyktwrjvtofjfxwlp.supabase.co";
const SUPABASE_ANON_KEY: string = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);