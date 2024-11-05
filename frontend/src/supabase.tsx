import { createClient, SupabaseClient } from '@supabase/supabase-js';

// VITE_APP_SUPABASE_URI="https://hgswyktwrjvtofjfxwlp.supabase.co"
// VITE_APP_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhnc3d5a3R3cmp2dG9mamZ4d2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMTIzMzYsImV4cCI6MjA0NTc4ODMzNn0.xKQhy8kJ-nCS0wU0jPed7bB7Ymmg7zz27PwdUeO_DJo"
// VITE_BACKEND_URL="https://intern-final-project.onrender.com"


const SUPABASE_URL = import.meta.env.VITE_APP_SUPABASE_URI as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_APP_SUPABASE_ANON_KEY as string;

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);