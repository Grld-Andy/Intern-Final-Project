import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL: string = import.meta.env.VITE_APP_SUPABASE_URI as string;
const SUPABASE_ANON_KEY: string = import.meta.env.VITE_APP_SUPABASE_ANON_KEY as string;

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);