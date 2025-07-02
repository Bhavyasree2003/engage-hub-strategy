
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Calendar, 
  FileText, 
  Users, 
  Twitter, 
  Linkedin, 
  Instagram,
  Plus
} from 'lucide-react';

interface DashboardProps {
  generatedContent: any[];
  scheduledContent: any[];
  setActiveTab: (tab: string) => void;
}

export const Dashboard = ({ generatedContent, scheduledContent, setActiveTab }: DashboardProps) => {
  const stats = [
    {
      title: 'Generated Ideas',
      value: generatedContent.length,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Scheduled Posts',
      value: scheduledContent.length,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Platforms',
      value: 3,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Active Campaigns',
      value: 2,
      icon: Users,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const platforms = [
    { name: 'Twitter', icon: Twitter, posts: scheduledContent.filter(c => c.platform === 'twitter').length, color: 'text-blue-500' },
    { name: 'LinkedIn', icon: Linkedin, posts: scheduledContent.filter(c => c.platform === 'linkedin').length, color: 'text-blue-700' },
    { name: 'Instagram', icon: Instagram, posts: scheduledContent.filter(c => c.platform === 'instagram').length, color: 'text-pink-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome to DevifyX MarketingAI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Generate intelligent content strategies across platforms with the power of AI
        </p>
        <Button 
          onClick={() => setActiveTab('generate')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Start Creating Content
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Platform Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-6 h-6 ${platform.color}`} />
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{platform.posts}</div>
                    <div className="text-sm text-gray-500">scheduled posts</div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setActiveTab('generate')}
              className="w-full justify-start h-12 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 border border-blue-200"
            >
              <Plus className="w-5 h-5 mr-3" />
              Generate New Content Ideas
            </Button>
            <Button 
              onClick={() => setActiveTab('calendar')}
              className="w-full justify-start h-12 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 hover:from-green-100 hover:to-emerald-100 border border-green-200"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Schedule Content
            </Button>
            <Button 
              onClick={() => setActiveTab('library')}
              className="w-full justify-start h-12 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:from-purple-100 hover:to-pink-100 border border-purple-200"
            >
              <FileText className="w-5 h-5 mr-3" />
              Browse Content Library
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
