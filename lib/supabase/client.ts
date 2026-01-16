import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://xblvyclhtggvdyxuytpy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhibHZ5Y2xodGdndmR5eHV5dHB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1ODY3MDUsImV4cCI6MjA4NDE2MjcwNX0.roVgtOMMarvz4kLwl7MIQUCebhIPF8i5hQALVa06xRc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});