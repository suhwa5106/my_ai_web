import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dobzlizsxxqzofrjvpqp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvYnpsaXpzeHhxem9mcmp2cHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMjA2NDksImV4cCI6MjA4MTY5NjY0OX0.wEoKL-edWWVccBEldYi0ZadGeO4GXSMcWLOcOC7w204';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
