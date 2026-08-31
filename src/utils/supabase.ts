import { createClient } from "@supabase/supabase-js";

// Read the Supabase project details from our Vite environment variables.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Create one reusable Supabase client for the whole app.
export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
