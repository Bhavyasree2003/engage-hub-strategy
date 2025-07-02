
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Video, Sparkles, Upload, Play, Download, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const VideoGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [videoConfig, setVideoConfig] = useState({
    prompt: '',
    style: 'professional',
    duration: '30',
    aspectRatio: '16:9',
    voiceover: true,
    backgroundMusic: true
  });

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

    setIsGenerating(true);

    try {
      // Simulate AI video generation
      await new Promise(resolve => setTimeout(resolve, 8000));
      
      // Mock video URL (in real app, this would come from AI service)
      setGeneratedVideo('https://www.w3schools.com/html/mov_bbb.mp4');
      
      toast({
        title: "Video generated successfully!",
        description: "Your AI-powered video is ready for preview and download."
      });
    } catch (error) {
      toast({
        title: "Video generation failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transform hover:scale-105 transition-all duration-300">
          AI Video Generator
        </h1>
        <p className="text-gray-600">
          Transform your content ideas into engaging video content with AI
        </p>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm">
          <Sparkles className="w-4 h-4 mr-1" />
          Optional Premium Feature
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
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Video... (This may take a few minutes)
                </>
              ) : (
                <>
                  <Video className="w-5 h-5 mr-2" />
                  Generate AI Video
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-blue-600" />
              <span>Video Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {generatedVideo ? (
              <div className="space-y-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                  <video 
                    controls 
                    className="w-full h-full"
                    src={generatedVideo}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline"
                    className="transform hover:scale-105 transition-all duration-200"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Video className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-600">No video generated yet</h3>
                    <p className="text-sm text-gray-500">Configure your video settings and click generate</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-orange-800">🚀 Premium Feature</h3>
            <p className="text-orange-700">
              AI Video Generation requires backend integration and premium APIs. 
              Connect to Supabase to enable full video generation capabilities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
