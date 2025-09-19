import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const genAI = new GoogleGenerativeAI("AIzaSyBfQDfp-qNWoVCYxAVtVYmncLSHjEZV1wg");
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const prompt = `You are a motivational and encouraging AI chatbot for mental health support. Respond in a positive, supportive, and uplifting way. Always encourage the user and provide helpful advice.give response in 4-5 lines  ${input}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const aiMessage = { role: 'assistant' as const, content: text };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant' as const, content: 'Sorry, I encountered an error. Remember, you are strong and capable!' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">AI Chatbot</h1>
        <Card className="h-96 overflow-y-auto mb-4">
          <CardContent className="p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && <div className="text-center">AI is typing...</div>}
            <div ref={messagesEndRef} />
          </CardContent>
        </Card>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={loading}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;