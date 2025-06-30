import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase initialization:', {
  NODE_ENV: import.meta.env.MODE,
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl || 'undefined',
  keyLength: supabaseAnonKey?.length || 0
})

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = `Missing Supabase environment variables:
    VITE_SUPABASE_URL: ${supabaseUrl ? 'present' : 'missing'}
    VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'present' : 'missing'}
  `;
  console.error(errorMsg);
  throw new Error(errorMsg);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('Supabase client created successfully');