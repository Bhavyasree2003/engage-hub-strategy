
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Twitter, Linkedin, Instagram, Loader2, Eye, Copy, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContentGeneratorProps {
  onContentGenerated: (content: any[]) => void;
}

export const ContentGenerator = ({ onContentGenerated }: ContentGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    businessType: '',
    targetAudience: '',
    contentGoals: '',
    brandVoice: 'professional',
    platforms: ['twitter', 'linkedin', 'instagram'],
    contentTypes: ['educational', 'promotional', 'interactive'],
    industry: '',
    keywords: ''
  });

  const platforms = [
    { id: 'twitter', name: 'Twitter', icon: Twitter, description: 'Short, engaging tweets' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, description: 'Professional content' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, description: 'Visual storytelling' },
  ];

  const contentTypes = [
    { id: 'educational', name: 'Educational', description: 'Tips, tutorials, insights' },
    { id: 'promotional', name: 'Promotional', description: 'Product features, offers' },
    { id: 'interactive', name: 'Interactive', description: 'Polls, questions, challenges' },
    { id: 'behind-the-scenes', name: 'Behind the Scenes', description: 'Company culture, process' },
    { id: 'user-generated', name: 'User Generated', description: 'Customer stories, testimonials' },
  ];

  const voiceOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual & Friendly' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'playful', label: 'Playful & Fun' },
    { value: 'inspirational', label: 'Inspirational' },
  ];

  const handlePlatformChange = (platformId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platformId]
        : prev.platforms.filter(p => p !== platformId)
    }));
  };

  const handleContentTypeChange = (typeId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: checked 
        ? [...prev.contentTypes, typeId]
        : prev.contentTypes.filter(t => t !== typeId)
    }));
  };

  const generateMockContent = () => {
    const mockContent = [];
    const sampleContent = {
      twitter: [
        { text: "🚀 Quick tip: Always A/B test your headlines! Small changes can lead to 40% better engagement. What's your favorite testing strategy? #MarketingTips", type: 'educational' },
        { text: "🎉 Exciting news! We've just launched our new feature that helps you track ROI more effectively. Early access available now! 👇", type: 'promotional' },
        { text: "Poll time! 📊 What's your biggest marketing challenge this quarter? A) Budget constraints B) Lead generation C) Content creation D) Analytics", type: 'interactive' }
      ],
      linkedin: [
        { text: "The marketing landscape has evolved dramatically. Here are 5 key trends every marketer should watch in 2024:\n\n1. AI-powered personalization\n2. Voice search optimization\n3. Sustainable marketing practices\n4. Community-driven growth\n5. Cross-platform storytelling\n\nWhich trend excites you most?", type: 'educational' },
        { text: "We're thrilled to announce our partnership with industry leaders to bring you enhanced analytics capabilities. This collaboration represents our commitment to data-driven marketing excellence. #Partnership #Innovation", type: 'promotional' },
        { text: "Behind every successful campaign is a team that's not afraid to experiment. What's the most creative marketing experiment you've tried recently? Share your insights below! 💡", type: 'interactive' }
      ],
      instagram: [
        { text: "Swipe to see how we transformed our client's engagement rate by 150% in just 30 days! ✨ The secret? Understanding your audience deeply and creating content that resonates. #MarketingSuccess #TransformationTuesday", type: 'educational' },
        { text: "🌟 New collection alert! Our latest marketing toolkit is here to help small businesses grow their online presence. Limited time offer - link in bio! #SmallBusiness #MarketingTools", type: 'promotional' },
        { text: "Challenge accepted! 💪 This week we're sharing our favorite productivity hacks. What's yours? Tag a friend who needs to see this! #ProductivityChallenge #MarketingLife", type: 'interactive' }
      ]
    };

    formData.platforms.forEach(platform => {
      formData.contentTypes.forEach(type => {
        const platformContent = sampleContent[platform as keyof typeof sampleContent];
        const relevantContent = platformContent?.filter(c => c.type === type) || [];
        
        relevantContent.forEach(content => {
          mockContent.push({
            id: Math.random().toString(36).substr(2, 9),
            platform,
            type,
            text: content.text,
            createdAt: new Date(),
            engagement: Math.floor(Math.random() * 100) + 20,
            rating: null
          });
        });
      });
    });

    return mockContent;
  };

  const handleGenerate = async () => {
    console.log('Generate button clicked');
    console.log('Form data:', formData);
    
    if (formData.platforms.length === 0) {
      toast({
        title: "Please select at least one platform",
        variant: "destructive"
      });
      return;
    }

    if (formData.contentTypes.length === 0) {
      toast({
        title: "Please select at least one content type",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newContent = generateMockContent();
      console.log('Generated content:', newContent);
      
      setGeneratedContent(newContent);
      onContentGenerated(newContent);
      
      toast({
        title: `Generated ${newContent.length} content ideas!`,
        description: "Your AI-powered content is ready for review and scheduling."
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'instagram': return Instagram;
      default: return Sparkles;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'from-blue-500 to-blue-600';
      case 'linkedin': return 'from-blue-700 to-blue-800';
      case 'instagram': return 'from-pink-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
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

  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Content copied to clipboard!",
      description: "You can now paste it anywhere."
    });
  };

  console.log('Current generated content state:', generatedContent);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transform hover:scale-105 transition-all duration-300">
          AI Content Generator
        </h1>
        <p className="text-gray-600">
          Provide your business details and audience insights to generate tailored content ideas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Business Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="business-type">Business Type</Label>
              <Input
                id="business-type"
                placeholder="e.g., SaaS, E-commerce, Consulting"
                value={formData.businessType}
                onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                className="transform focus:scale-[1.02] transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="e.g., Technology, Healthcare, Finance"
                value={formData.industry}
                onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                className="transform focus:scale-[1.02] transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-audience">Target Audience</Label>
              <Textarea
                id="target-audience"
                placeholder="Describe your ideal customers, their demographics, interests, and pain points..."
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                rows={3}
                className="transform focus:scale-[1.02] transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-goals">Content Goals</Label>
              <Textarea
                id="content-goals"
                placeholder="What do you want to achieve? Brand awareness, lead generation, customer education..."
                value={formData.contentGoals}
                onChange={(e) => setFormData(prev => ({ ...prev, contentGoals: e.target.value }))}
                rows={3}
                className="transform focus:scale-[1.02] transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords & Topics</Label>
              <Input
                id="keywords"
                placeholder="Enter relevant keywords separated by commas"
                value={formData.keywords}
                onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                className="transform focus:scale-[1.02] transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand-voice">Brand Voice</Label>
              <Select value={formData.brandVoice} onValueChange={(value) => setFormData(prev => ({ ...prev, brandVoice: value }))}>
                <SelectTrigger className="transform focus:scale-[1.02] transition-all duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {voiceOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center space-x-2">
              <Twitter className="w-5 h-5 text-blue-500" />
              <span>Platform & Content Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-4">
              <Label>Target Platforms</Label>
              {platforms.map(platform => {
                const Icon = platform.icon;
                return (
                  <div key={platform.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transform hover:scale-[1.02] hover:bg-gray-100 transition-all duration-200">
                    <Checkbox
                      id={platform.id}
                      checked={formData.platforms.includes(platform.id)}
                      onCheckedChange={(checked) => handlePlatformChange(platform.id, checked as boolean)}
                    />
                    <Icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <Label htmlFor={platform.id} className="font-medium cursor-pointer">
                        {platform.name}
                      </Label>
                      <p className="text-sm text-gray-500">{platform.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4">
              <Label>Content Types</Label>
              {contentTypes.map(type => (
                <div key={type.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transform hover:scale-[1.02] hover:bg-gray-100 transition-all duration-200">
                  <Checkbox
                    id={type.id}
                    checked={formData.contentTypes.includes(type.id)}
                    onCheckedChange={(checked) => handleContentTypeChange(type.id, checked as boolean)}
                  />
                  <div>
                    <Label htmlFor={type.id} className="font-medium cursor-pointer">
                      {type.name}
                    </Label>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate AI Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Generated Content Display */}
      {generatedContent.length > 0 && (
        <Card className="border-0 shadow-lg transform hover:scale-[1.01] transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-green-600" />
              <span>Generated Content Ideas ({generatedContent.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedContent.map((item, index) => {
                const PlatformIcon = getPlatformIcon(item.platform);
                return (
                  <Card 
                    key={item.id} 
                    className="border-2 border-gray-100 hover:border-blue-200 transform hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${getPlatformColor(item.platform)} transform hover:scale-110 transition-all duration-200`}>
                            <PlatformIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium capitalize">{item.platform}</span>
                        </div>
                        <Badge className={`${getTypeColor(item.type)} transform hover:scale-105 transition-all duration-200`}>
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

                      <div className="flex items-center justify-center space-x-2 pt-2 border-t">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyContent(item.text)}
                          className="h-8 px-3 transform hover:scale-110 transition-all duration-200"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-3 transform hover:scale-110 transition-all duration-200"
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Debug section - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <p>Generated content length: {generatedContent.length}</p>
          <p>Is generating: {isGenerating.toString()}</p>
          <p>Selected platforms: {formData.platforms.join(', ')}</p>
          <p>Selected content types: {formData.contentTypes.join(', ')}</p>
        </div>
      )}
    </div>
  );
};
