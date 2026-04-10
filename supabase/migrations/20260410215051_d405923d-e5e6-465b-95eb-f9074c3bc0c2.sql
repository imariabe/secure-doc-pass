
-- Create login activity tracking table
CREATE TABLE public.login_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  device_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.login_activity ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own activity
CREATE POLICY "Anyone can insert login activity" ON public.login_activity
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow service role to read all (for admin/edge functions)
CREATE POLICY "Service role can read all" ON public.login_activity
  FOR SELECT TO service_role USING (true);
