// /src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// --- IMPORTANT: REPLACE with your own Supabase project details ---
const supabaseUrl = 'https://ulxyefrtgogcqekjgang.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseHllZnJ0Z29nY3Fla2pnYW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMjgwMTIsImV4cCI6MjA2OTkwNDAxMn0.HzaofgNOpgyukqbrxel5z3WHKf3fAlJ7eXnlFpH2ZRo';

// Create and export the Supabase client. This single object is our gateway to the backend.
export const supabase = createClient(supabaseUrl, supabaseKey);