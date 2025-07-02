
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ContentGenerator } from '@/components/ContentGenerator';
import { ContentCalendar } from '@/components/ContentCalendar';
import { ContentLibrary } from '@/components/ContentLibrary';
import { Dashboard } from '@/components/Dashboard';

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
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            generatedContent={generatedContent}
            scheduledContent={scheduledContent}
            setActiveTab={setActiveTab}
          />
        )}
        
        {activeTab === 'generate' && (
          <ContentGenerator onContentGenerated={handleContentGenerated} />
        )}
        
        {activeTab === 'calendar' && (
          <ContentCalendar 
            scheduledContent={scheduledContent}
            availableContent={generatedContent}
            onScheduleContent={handleScheduleContent}
          />
        )}
        
        {activeTab === 'library' && (
          <ContentLibrary 
            content={generatedContent}
            onScheduleContent={handleScheduleContent}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
