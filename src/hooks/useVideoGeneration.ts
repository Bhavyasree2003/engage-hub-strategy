
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type VideoGeneration = Database['public']['Tables']['video_generations']['Row'];
type VideoGenerationInsert = Database['public']['Tables']['video_generations']['Insert'];

export const useVideoGeneration = (userId: string | null) => {
  const [generations, setGenerations] = useState<VideoGeneration[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchGenerations();
    }
  }, [userId]);

  const fetchGenerations = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('video_generations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGenerations(data || []);
    } catch (error: any) {
      console.error('Error fetching video generations:', error);
      toast({
        title: "Failed to load video history",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createGeneration = async (config: {
    prompt: string;
    style: string;
    duration: string;
    aspectRatio: string;
    voiceover: boolean;
    backgroundMusic: boolean;
  }) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to generate videos.",
        variant: "destructive",
      });
      return null;
    }

    setLoading(true);

    try {
      const insertData: VideoGenerationInsert = {
        user_id: userId,
        prompt: config.prompt,
        style: config.style,
        duration: parseInt(config.duration),
        aspect_ratio: config.aspectRatio,
        voiceover: config.voiceover,
        background_music: config.backgroundMusic,
        status: 'pending',
      };

      const { data, error } = await supabase
        .from('video_generations')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      // Simulate video generation process
      setTimeout(async () => {
        try {
          const { error: updateError } = await supabase
            .from('video_generations')
            .update({
              status: 'completed',
              video_url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Mock video URL
              updated_at: new Date().toISOString(),
            })
            .eq('id', data.id);

          if (updateError) throw updateError;

          toast({
            title: "Video generated successfully!",
            description: "Your AI-powered video is ready for preview and download.",
          });

          fetchGenerations();
        } catch (error: any) {
          console.error('Error updating video generation:', error);
          await supabase
            .from('video_generations')
            .update({
              status: 'failed',
              error_message: error.message,
              updated_at: new Date().toISOString(),
            })
            .eq('id', data.id);

          toast({
            title: "Video generation failed",
            description: error.message,
            variant: "destructive",
          });

          fetchGenerations();
        }
      }, 8000);

      fetchGenerations();
      return data;
    } catch (error: any) {
      console.error('Error creating video generation:', error);
      toast({
        title: "Failed to start video generation",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    generations,
    loading,
    createGeneration,
    refreshGenerations: fetchGenerations,
  };
};
