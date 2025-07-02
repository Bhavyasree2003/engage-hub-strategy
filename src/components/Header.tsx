
import React from 'react';
import { Brain, Calendar, Library, Home, Sparkles, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'generate', label: 'Generate Content', icon: Brain },
    { id: 'videos', label: 'AI Videos', icon: Video },
    { id: 'calendar', label: 'Content Calendar', icon: Calendar },
    { id: 'library', label: 'Content Library', icon: Library },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 transform transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl transform hover:scale-110 hover:rotate-12 transition-all duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transform hover:scale-105 transition-all duration-300">
                DevifyX MarketingAI
              </h1>
              <p className="text-sm text-gray-500">Content Strategy Platform</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl' 
                      : 'hover:bg-blue-50 hover:shadow-md'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
