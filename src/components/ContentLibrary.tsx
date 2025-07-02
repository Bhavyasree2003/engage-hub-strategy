
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Library, 
  Search, 
  Filter, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Calendar,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Edit
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContentLibraryProps {
  content: any[];
  onScheduleContent: (content: any, date: string) => void;
}

export const ContentLibrary = ({ content, onScheduleContent }: ContentLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'instagram': return Instagram;
      default: return Library;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-blue-500';
      case 'linkedin': return 'bg-blue-700';
      case 'instagram': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'educational': return 'bg-green-100 text-green-800';
      case 'promotional': return 'bg-orange-100 text-orange-800';
      case 'interactive': return 'bg-purple-100 text-purple-800';
      case 'behind-the-scenes': return 'bg-blue-100 text-blue-800';
      case 'user-generated': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || item.platform === filterPlatform;
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesPlatform && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'engagement':
        return b.engagement - a.engagement;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Content copied to clipboard!",
      description: "You can now paste it anywhere."
    });
  };

  const handleRateContent = (contentId: string, rating: 'like' | 'dislike') => {
    toast({
      title: `Content ${rating}d!`,
      description: "Thank you for your feedback. This helps improve our AI."
    });
  };

  const handleScheduleFromLibrary = (content: any) => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    onScheduleContent(content, dateStr);
    toast({
      title: "Content scheduled!",
      description: `Your ${content.platform} post has been scheduled for today.`
    });
  };

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'instagram', label: 'Instagram' },
  ];

  const contentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'educational', label: 'Educational' },
    { value: 'promotional', label: 'Promotional' },
    { value: 'interactive', label: 'Interactive' },
    { value: 'behind-the-scenes', label: 'Behind the Scenes' },
    { value: 'user-generated', label: 'User Generated' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Content Library
        </h1>
        <p className="text-gray-600">
          Manage, search, and organize all your generated content
        </p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Library className="w-6 h-6 text-blue-600" />
            <span>Content Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platforms.map(platform => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="engagement">Best Engagement</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <Library className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-500">
                {content.length === 0 
                  ? "Generate some content first to see it here."
                  : "Try adjusting your search filters."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => {
                const PlatformIcon = getPlatformIcon(item.platform);
                return (
                  <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${getPlatformColor(item.platform)}`}>
                            <PlatformIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium capitalize">{item.platform}</span>
                        </div>
                        <Badge className={getTypeColor(item.type)}>
                          {item.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700 line-clamp-4">
                        {item.text}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Engagement: {item.engagement}%</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRateContent(item.id, 'like')}
                            className="h-8 w-8 p-0"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRateContent(item.id, 'dislike')}
                            className="h-8 w-8 p-0"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopyContent(item.text)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleScheduleFromLibrary(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
