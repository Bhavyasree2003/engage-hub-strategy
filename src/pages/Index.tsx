
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ContentGenerator } from '@/components/ContentGenerator';
import { ContentCalendar } from '@/components/ContentCalendar';
import { ContentLibrary } from '@/components/ContentLibrary';
import { Dashboard } from '@/components/Dashboard';
import { VideoGenerator } from '@/components/VideoGenerator';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [generatedContent, setGeneratedContent] = useState([]);
  const [scheduledContent, setScheduledContent] = useState([]);

  const handleContentGenerated = (content) => {
    setGeneratedContent(prev => [...prev, ...content]);
  };

  const handleScheduleContent = (content, date) => {
    setScheduledContent(prev => [...prev, { ...content, scheduledDate: date, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8 transform transition-all duration-500">
        <div className="animate-fade-in">
          {activeTab === 'dashboard' && (
            <div className="transform transition-all duration-500 hover:scale-[1.005]">
              <Dashboard 
                generatedContent={generatedContent}
                scheduledContent={scheduledContent}
                setActiveTab={setActiveTab}
              />
            </div>
          )}
          
          {activeTab === 'generate' && (
            <div className="transform transition-all duration-500 hover:scale-[1.005]">
              <ContentGenerator onContentGenerated={handleContentGenerated} />
            </div>
          )}
          
          {activeTab === 'calendar' && (
            <div className="transform transition-all duration-500 hover:scale-[1.005]">
              <ContentCalendar 
                scheduledContent={scheduledContent}
                availableContent={generatedContent}
                onScheduleContent={handleScheduleContent}
              />
            </div>
          )}
          
          {activeTab === 'library' && (
            <div className="transform transition-all duration-500 hover:scale-[1.005]">
              <ContentLibrary 
                content={generatedContent}
                onScheduleContent={handleScheduleContent}
              />
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="transform transition-all duration-500 hover:scale-[1.005]">
              <VideoGenerator />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
