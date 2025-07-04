
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Video, Sparkles, Play, Download, Loader2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useVideoGeneration } from '@/hooks/useVideoGeneration';
import type { User } from '@supabase/supabase-js';

export const VideoGenerator = () => {
  const [user, setUser] = useState<User | null>(null);
  const [videoConfig, setVideoConfig] = useState({
    prompt: '',
    style: 'professional',
    duration: '30',
    aspectRatio: '16:9',
    voiceover: true,
    backgroundMusic: true
  });
  
  const [demoGenerations, setDemoGenerations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Use database when signed in, demo mode when not
  const { generations: dbGenerations, loading: dbLoading, createGeneration } = useVideoGeneration(user?.id || null);
  const generations = user ? dbGenerations : demoGenerations;

  const videoStyles = [
    { value: 'professional', label: 'Professional' },
    { value: 'creative', label: 'Creative & Artistic' },
    { value: 'minimal', label: 'Clean & Minimal' },
    { value: 'dynamic', label: 'Dynamic & Energetic' },
    { value: 'corporate', label: 'Corporate' },
  ];

  const durations = [
    { value: '15', label: '15 seconds' },
    { value: '30', label: '30 seconds' },
    { value: '60', label: '1 minute' },
    { value: '90', label: '1.5 minutes' },
  ];

  const aspectRatios = [
    { value: '16:9', label: '16:9 (Landscape)' },
    { value: '9:16', label: '9:16 (Portrait)' },
    { value: '1:1', label: '1:1 (Square)' },
  ];

  const handleGenerateVideo = async () => {
    if (!videoConfig.prompt.trim()) {
      toast({
        title: "Please enter a video description",
        variant: "destructive"
      });
      return;
    }

    if (user) {
      // Use database when signed in
      await createGeneration(videoConfig);
    } else {
      // Demo mode when not signed in
      setLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const demoVideo = {
          id: Math.random().toString(36).substr(2, 9),
          prompt: videoConfig.prompt,
          style: videoConfig.style,
          duration: parseInt(videoConfig.duration),
          aspect_ratio: videoConfig.aspectRatio,
          voiceover: videoConfig.voiceover,
          background_music: videoConfig.backgroundMusic,
          status: 'completed',
          video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          created_at: new Date().toISOString(),
          error_message: null
        };
        
        setDemoGenerations(prev => [demoVideo, ...prev]);
        
        toast({
          title: "Demo video generated!",
          description: "Sign in to save your videos and access advanced features."
        });
      } catch (error) {
        toast({
          title: "Generation failed",
          description: "Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transform hover:scale-105 transition-all duration-300">
          AI Video Generator
        </h1>
        <p className="text-gray-600">
          Transform your content ideas into engaging video content with AI
        </p>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm">
          <Sparkles className="w-4 h-4 mr-1" />
          Powered by Supabase
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center space-x-2">
              <Video className="w-5 h-5 text-purple-600" />
              <span>Video Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="video-prompt">Video Description</Label>
              <Textarea
                id="video-prompt"
                placeholder="Describe what you want in your video: scenes, text overlays, style, mood..."
                value={videoConfig.prompt}
                onChange={(e) => setVideoConfig(prev => ({ ...prev, prompt: e.target.value }))}
                rows={4}
                className="transform focus:scale-[1.02] transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label>Video Style</Label>
              <Select 
                value={videoConfig.style} 
                onValueChange={(value) => setVideoConfig(prev => ({ ...prev, style: value }))}
              >
                <SelectTrigger className="transform focus:scale-[1.02] transition-all duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {videoStyles.map(style => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select 
                  value={videoConfig.duration} 
                  onValueChange={(value) => setVideoConfig(prev => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map(duration => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Aspect Ratio</Label>
                <Select 
                  value={videoConfig.aspectRatio} 
                  onValueChange={(value) => setVideoConfig(prev => ({ ...prev, aspectRatio: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map(ratio => (
                      <SelectItem key={ratio.value} value={ratio.value}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="voiceover"
                  checked={videoConfig.voiceover}
                  onChange={(e) => setVideoConfig(prev => ({ ...prev, voiceover: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="voiceover">Include AI Voiceover</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="background-music"
                  checked={videoConfig.backgroundMusic}
                  onChange={(e) => setVideoConfig(prev => ({ ...prev, backgroundMusic: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="background-music">Add Background Music</Label>
              </div>
            </div>

            <Button 
              onClick={handleGenerateVideo}
              disabled={loading || dbLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              {(loading || dbLoading) ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Video... (This may take a few minutes)
                </>
              ) : (
                <>
                  <Video className="w-5 h-5 mr-2" />
                  Generate AI Video {!user && "(Demo)"}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-blue-600" />
              <span>Video History {!user && "(Demo)"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {generations.length === 0 ? (
              <div className="text-center space-y-4">
                <Video className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-medium text-gray-600">No videos generated yet</h3>
                  <p className="text-sm text-gray-500">
                    Configure your video settings and click generate
                    {!user && " (demo videos will appear here)"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {generations.map((generation) => (
                  <Card key={generation.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(generation.status)}
                          <span className="text-sm font-medium">
                            {getStatusText(generation.status)}
                          </span>
                          {!user && <Badge variant="outline">Demo</Badge>}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(generation.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                        {generation.prompt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{generation.style}</span>
                        <span>{generation.duration}s</span>
                        <span>{generation.aspect_ratio}</span>
                      </div>

                      {generation.status === 'completed' && generation.video_url && (
                        <div className="space-y-2">
                          <video 
                            controls 
                            className="w-full h-32 object-cover rounded"
                            src={generation.video_url}
                          />
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Play className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      )}

                      {generation.status === 'failed' && generation.error_message && (
                        <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                          Error: {generation.error_message}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
