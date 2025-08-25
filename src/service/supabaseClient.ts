import { createClient } from '@supabase/supabase-js';
import { Database } from "../types"

const supabaseUrl = 'https://yhiepgpxvipzxgprhcpt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloaWVwZ3B4dmlwenhncHJoY3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NjQ5MzEsImV4cCI6MjA3MTU0MDkzMX0.oLPiuMgKQ8Vv1mBaM5sNMpLJwo8iHdI0Ux3kXf3nn4U';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);