
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Twitter, Linkedin, Instagram, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface ContentCalendarProps {
  scheduledContent: any[];
  availableContent: any[];
  onScheduleContent: (content: any, date: string) => void;
}

export const ContentCalendar = ({ scheduledContent, availableContent, onScheduleContent }: ContentCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<string>('');

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'instagram': return Instagram;
      default: return CalendarIcon;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-blue-500 bg-blue-50';
      case 'linkedin': return 'text-blue-700 bg-blue-50';
      case 'instagram': return 'text-pink-500 bg-pink-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getScheduledContentForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduledContent.filter(content => content.scheduledDate === dateStr);
  };

  const handleScheduleContent = () => {
    if (!selectedContent || !selectedDate) return;
    
    const content = availableContent.find(c => c.id === selectedContent);
    if (content) {
      onScheduleContent(content, selectedDate);
      setSelectedContent('');
      setSelectedDate(null);
      toast({
        title: "Content scheduled successfully!",
        description: `Your ${content.platform} post has been scheduled.`
      });
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Content Calendar
        </h1>
        <p className="text-gray-600">
          Schedule and organize your content across all platforms
        </p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
              <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth(currentDate).map((day, index) => {
              if (day === null) {
                return <div key={index} className="p-2 h-24" />;
              }
              
              const scheduledForDay = getScheduledContentForDate(day);
              const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              
              return (
                <div key={day} className="border border-gray-200 rounded-lg p-2 h-24 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{day}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-blue-100"
                          onClick={() => setSelectedDate(dateStr)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Schedule Content for {dateStr}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Select Content</label>
                            <Select value={selectedContent} onValueChange={setSelectedContent}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose content to schedule" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableContent.map(content => {
                                  const Icon = getPlatformIcon(content.platform);
                                  return (
                                    <SelectItem key={content.id} value={content.id}>
                                      <div className="flex items-center space-x-2">
                                        <Icon className="w-4 h-4" />
                                        <span className="truncate max-w-xs">
                                          {content.text.substring(0, 50)}...
                                        </span>
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={handleScheduleContent} className="w-full">
                            Schedule Content
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="space-y-1">
                    {scheduledForDay.slice(0, 2).map((content, i) => {
                      const Icon = getPlatformIcon(content.platform);
                      return (
                        <div key={i} className={`flex items-center space-x-1 p-1 rounded text-xs ${getPlatformColor(content.platform)}`}>
                          <Icon className="w-3 h-3" />
                          <span className="truncate">{content.type}</span>
                        </div>
                      );
                    })}
                    {scheduledForDay.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{scheduledForDay.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
