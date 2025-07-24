import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface AIChatAssistantProps {
  initialQuestion?: string;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ initialQuestion }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [chatLog, setChatLog] = useState<{ user: string; response: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const sendQuery = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);

    // Add user query to chat log
    setChatLog(prev => [...prev, { user: q, response: '' }]);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await response.json();
      if (response.ok) {
        setChatLog(prev => {
          const newLog = [...prev];
          newLog[newLog.length - 1].response = data.response;
          return newLog;
        });
      } else {
        setError(data.error || 'Error from AI assistant');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  const handleSend = () => {
    sendQuery(query);
  };

  React.useEffect(() => {
    if (initialQuestion) {
      sendQuery(initialQuestion);
    }
  }, [initialQuestion]);

  return (
    <Card className="border-green-200">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <CardTitle className="text-green-800">
          {language === 'en' ? 'AI Pregnancy Assistant Chat' : 'Mazungumzo na Msaidizi wa AI wa Ujauzito'}
        </CardTitle>
        <CardDescription>
          {language === 'en'
            ? 'Ask any pregnancy-related question and get immediate guidance.'
            : 'Uliza swali lolote linalohusiana na ujauzito na upate mwongozo wa haraka.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-64 overflow-y-auto mb-4 border p-3 rounded bg-white">
          {chatLog.length === 0 && (
            <p className="text-gray-500 italic">
              {language === 'en' ? 'Start the conversation by typing your question.' : 'Anza mazungumzo kwa kuandika swali lako.'}
            </p>
          )}
          {chatLog.map((entry, index) => (
            <div key={index} className="mb-3">
              <p className="font-semibold text-green-700">{language === 'en' ? 'You:' : 'Wewe:'}</p>
              <p className="mb-1">{entry.user}</p>
              <p className="font-semibold text-purple-700">{language === 'en' ? 'Assistant:' : 'Msaidizi:'}</p>
              <p>{entry.response}</p>
            </div>
          ))}
        </div>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={language === 'en' ? 'Type your question...' : 'Andika swali lako...'}
            value={query}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading}>
            {loading ? (language === 'en' ? 'Sending...' : 'Inatuma...') : (language === 'en' ? 'Send' : 'Tuma')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatAssistant;
