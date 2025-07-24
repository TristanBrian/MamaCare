
import React from 'react';
import { MessageSquare, Users, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const Community: React.FC = () => {
  const { t } = useLanguage();

  const discussionTopics = [
    {
      title: "Morning Sickness Remedies",
      author: "Jane Smith",
      replies: 24,
      lastActivity: "2 hours ago",
      tags: ["First Trimester", "Wellness"]
    },
    {
      title: "Preparing for Hospital Delivery",
      author: "Maria Johnson",
      replies: 18,
      lastActivity: "1 day ago",
      tags: ["Third Trimester", "Birth Planning"]
    },
    {
      title: "Breastfeeding Tips for New Mothers",
      author: "Sarah Williams",
      replies: 32,
      lastActivity: "3 hours ago",
      tags: ["Postnatal", "Breastfeeding"]
    },
    {
      title: "Baby Sleep Schedules",
      author: "Emily Davis",
      replies: 29,
      lastActivity: "5 hours ago",
      tags: ["Newborn", "Sleep"]
    }
  ];

  const supportGroups = [
    {
      name: "First-Time Mothers",
      members: 1240,
      description: "Support group for women experiencing pregnancy for the first time."
    },
    {
      name: "High-Risk Pregnancy Support",
      members: 856,
      description: "A community for mothers with high-risk pregnancies to share experiences and advice."
    },
    {
      name: "Breastfeeding Support",
      members: 1890,
      description: "Get help and advice on breastfeeding techniques and challenges."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">
          {t('community')}
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Connect with other mothers, share experiences, and get support on your maternal health journey.
        </p>

        {/* Search Bar */}
        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input 
            type="text" 
            placeholder="Search discussions and support groups..." 
            className="pl-10 w-full"
          />
        </div>

        {/* Featured Discussions */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Featured Discussions</span>
                </CardTitle>
                <CardDescription>Join the conversation with other mothers</CardDescription>
              </div>
              <Button size="sm" className="bg-maternal-purple hover:bg-maternal-purple-dark">
                New Post
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discussionTopics.map((topic, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg hover:text-maternal-purple cursor-pointer">
                      {topic.title}
                    </h3>
                    <div className="text-gray-500 text-sm">
                      {topic.lastActivity}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Posted by <span className="font-medium">{topic.author}</span> • {topic.replies} replies
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {topic.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="bg-maternal-purple-light text-maternal-purple-dark text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="link" className="text-maternal-purple">
              View All Discussions
            </Button>
          </CardFooter>
        </Card>

        {/* Support Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Support Groups</span>
            </CardTitle>
            <CardDescription>Find your community of support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportGroups.map((group, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <h3 className="font-medium text-lg">{group.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{group.members} members</p>
                  <p className="text-sm text-gray-600 mb-4">{group.description}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-maternal-purple border-maternal-purple"
                  >
                    Join Group
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
