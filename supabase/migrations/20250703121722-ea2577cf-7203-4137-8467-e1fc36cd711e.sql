
-- Create table for video generation requests
CREATE TABLE public.video_generations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  prompt TEXT NOT NULL,
  style TEXT NOT NULL DEFAULT 'professional',
  duration INTEGER NOT NULL DEFAULT 30,
  aspect_ratio TEXT NOT NULL DEFAULT '16:9',
  voiceover BOOLEAN NOT NULL DEFAULT false,
  background_music BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  video_url TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.video_generations ENABLE ROW LEVEL SECURITY;

-- Create policies for video generations
CREATE POLICY "Users can view their own video generations" 
  ON public.video_generations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own video generations" 
  ON public.video_generations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own video generations" 
  ON public.video_generations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create storage bucket for generated videos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('generated-videos', 'generated-videos', true);

-- Create storage policies for videos
CREATE POLICY "Users can view generated videos" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'generated-videos');

CREATE POLICY "Service can upload generated videos" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'generated-videos');

CREATE POLICY "Service can update generated videos" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'generated-videos');
