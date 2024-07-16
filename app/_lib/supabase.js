import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = process.env.BACKEND_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
