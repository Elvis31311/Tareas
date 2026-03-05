import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://antdrxwdvdnwxakwtrwj.supabase.co' 
const supabaseAnonKey = 'sb_publishable_YQ5aQ1SmXtIoSqqS-d7PyA_zPnLUx0W'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)