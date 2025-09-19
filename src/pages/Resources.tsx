import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Play,
  Download,
  BookOpen,
  Headphones,
  Video,
  Search,
  Clock,
  Globe,
  Pause,
  Sparkles,
  Loader
} from "lucide-react";

// The main App component
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [playingAudioUrl, setPlayingAudioUrl] = useState(null);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [meditationTopic, setMeditationTopic] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [isScriptLoading, setIsScriptLoading] = useState(false);

  const categories = [
    { id: "videos", label: "Videos", icon: Video },
    { id: "audio", label: "Audio", icon: Headphones },
    { id: "guides", label: "Guides", icon: BookOpen },
  ];

  const resources = {
    videos: [
      {
        title: "Managing Exam Stress",
        description: "Learn practical techniques to handle academic pressure",
        duration: "12 min",
        language: "English",
        difficulty: "Beginner",
        thumbnail: "🎓",
        category: "Academic Stress",
        url: "https://youtu.be/8jPQjjsBbIc?si=pRdnE5NT_Lo8hUo7"
      },
      {
        title: "Study Anxiety Management",
        description: "Practical strategies for managing study-related anxiety",
        duration: "15 min",
        language: "English",
        difficulty: "Beginner",
        thumbnail: "🧘",
        category: "Anxiety",
        url: "https://youtu.be/J0Fa24dqTvA?si=R5wUu_mDMWpmdTNL"
      },
      {
        title: "Mindful Breathing Exercises",
        description: "Simple breathing techniques for instant calm",
        duration: "8 min",
        language: "English",
        difficulty: "Beginner",
        thumbnail: "🌬️",
        category: "Mindfulness",
        url: "https://youtu.be/LiUnFJ8P4gM?si=0lAFX11sif3-EEdE"
      }
    ],
    audio: [
      {
        title: "Progressive Muscle Relaxation",
        description: "Guided relaxation for better sleep",
        duration: "20 min",
        language: "English",
        difficulty: "Beginner",
        thumbnail: "😴",
        category: "Sleep",
        url: "src/assets/meditation-bowl-for-focus-enhancement-388615.mp3"
      },
      {
        title: "Daily Meditation Practice",
        description: "A short guided meditation for your daily routine",
        duration: "10 min",
        language: "English",
        difficulty: "Beginner",
        thumbnail: "🧘‍♀️",
        category: "Meditation",
        url: "src/assets/inner-peace-339640.mp3"
      },
      {
        title: "Focus Enhancement Sounds",
        description: "Background sounds for studying",
        duration: "45 min",
        language: "Universal",
        difficulty: "Any",
        thumbnail: "🎵",
        category: "Focus",
        url: "src/assets/chill-vibes-for-gaming-focus-332247.mp3"
      }
    ],
    guides: [
      {
        title: "Building Healthy Study Habits",
        description: "Complete guide to effective study routines",
        duration: "5 min read",
        language: "English",
        difficulty: "Intermediate",
        thumbnail: "📚",
        category: "Study Skills",
        url: "src/assets/book1.pdf",
        content: `
        Effective study habits are crucial for academic success. One key strategy is to create a dedicated study space that is free from distractions. This area should have good lighting and all the necessary materials, such as books, pens, and a computer. Another vital habit is to create a study schedule. Break down your subjects and topics into manageable chunks and allocate specific time slots for each. Consistency is more important than long, infrequent cram sessions.
        
        Using active recall methods, like flashcards or self-quizzing, can significantly improve retention compared to passive reading. The Pomodoro Technique, which involves studying in focused 25-minute intervals followed by short breaks, can also boost productivity and prevent burnout. Lastly, getting enough sleep is non-negotiable. Aim for 7-9 hours of quality sleep to consolidate learning and improve concentration.
        `
      },
      {
        title: "Understanding and Coping with Depression",
        description: "A comprehensive guide to mental health awareness",
        duration: "8 min read",
        language: "English",
        difficulty: "Beginner",
        thumbnail: "💙",
        category: "Mental Health",
        url: "src/assets/book2.pdf",
        content: `
        Depression is a serious mood disorder. It can cause a persistent feeling of sadness and loss of interest. It affects how you feel, think, and behave and can lead to a variety of emotional and physical problems. The symptoms of depression can vary from mild to severe and may include feeling sad or having a depressed mood, loss of interest or pleasure in activities once enjoyed, changes in appetite, trouble sleeping or sleeping too much, loss of energy or increased fatigue, and difficulty thinking, concentrating, or making decisions.
        
        Coping with depression often involves a combination of professional help and lifestyle adjustments. Therapy, especially cognitive-behavioral therapy (CBT), can be very effective. Regular exercise, a balanced diet, and sufficient sleep are crucial. It's also important to maintain social connections and engage in activities you once enjoyed. Remember, it's a condition that can be managed with the right support. If you are struggling, please seek professional help.
        `
      },
      {
        title: "Social Anxiety Toolkit",
        description: "Practical strategies for social situations",
        duration: "6 min read",
        language: "English",
        difficulty: "Intermediate",
        thumbnail: "👥",
        category: "Social Skills",
        url: "./src/assets/_OceanofPDF.com_Overcome_Social_Anxiety_-_Care_Alison.pdf",
        content: `
        Social anxiety disorder involves an intense fear of being judged, negatively evaluated, or rejected in a social or performance situation. While some nervousness is normal, social anxiety can be debilitating. This toolkit provides practical strategies to manage it.
        
        One key strategy is gradual exposure. Start with social situations that cause only mild anxiety and slowly work your way up to more challenging ones. For example, begin by ordering a coffee from a barista and progress to having a short conversation with them. Another technique is to challenge negative thoughts. Instead of thinking, "Everyone is watching me and thinks I'm weird," try reframing it as, "I'm just a person in a room, and everyone is focused on their own things." Breathing exercises and mindfulness can also help to calm your body's physical response to anxiety. Remember, these are skills that can be learned and improved over time.
        `
      }
    ]
  };

  const languages = ["All Languages", "English", "Hindi", "Tamil", "Bengali"];

  const handleAISummary = async (content) => {
    setIsSummaryLoading(true);
    setIsSummaryDialogOpen(true);
    setSummary("");
    
    try {
      const systemPrompt = "You are a professional summarizer. Provide a concise, single-paragraph summary of the key findings and actionable tips from the provided text. Keep it under 100 words.";
      const userQuery = `Summarize this guide: ${content}`;
      const payload = {
          contents: [{ parts: [{ text: userQuery }] }],
          systemInstruction: {
              parts: [{ text: systemPrompt }]
          },
      };

      const apiKey = "AIzaSyBfQDfp-qNWoVCYxAVtVYmncLSHjEZV1wg";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate summary.";
      setSummary(text);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("Sorry, an error occurred while generating the summary.");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleGenerateScript = async () => {
    setIsScriptLoading(true);
    setGeneratedScript("");
    
    try {
      const systemPrompt = "You are a peaceful and calming meditation guide. Write a short guided meditation script. The script should be gentle and encouraging, with a calm tone. Do not include any sounds or music notes.";
      const userQuery = `Write a short guided meditation script (around 150 words) on the topic of ${meditationTopic || "general wellness and relaxation"}.`;
      const payload = {
          contents: [{ parts: [{ text: userQuery }] }],
          systemInstruction: {
              parts: [{ text: systemPrompt }]
          },
      };

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log(result)
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || " ‼️ coming soon ‼️";
      setGeneratedScript(text);
    } catch (error) {
      console.error("Error generating script:", error);
      setGeneratedScript("Sorry, an error occurred while generating the script.");
    } finally {
      setIsScriptLoading(false);
    }
  };

  const filteredResources = (type) => {
    return resources[type].filter(resource =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handlePlayClick = (url, type) => {
    if (type === 'audio') {
      if (playingAudioUrl === url) {
        setPlayingAudioUrl(null);
      } else {
        setPlayingAudioUrl(url);
      }
    } else {
      window.open(url, '_blank');
    }
  };

  const ResourceCard = ({ resource, type }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">{resource.thumbnail}</span>
              <Badge variant="secondary" className="text-xs">
                {resource.language}
              </Badge>
            </div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription className="mt-1">{resource.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>{resource.language}</span>
          </div>
          <Badge variant="outline">{resource.category}</Badge>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button variant="wellness" className="flex-1" onClick={() => handlePlayClick(resource.url, type)}>
              {type === "videos" ? <Play className="h-4 w-4 mr-2" /> :
              type === "audio" ? (playingAudioUrl === resource.url ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />) :
              <BookOpen className="h-4 w-4 mr-2" />}
              {type === "guides" ? "Read" : (playingAudioUrl === resource.url ? "Pause" : "Play")}
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
          {type === 'guides' && (
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={() => handleAISummary(resource.content)}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              ✨ AI Summary
            </Button>
          )}
        </div>
        {type === 'audio' && playingAudioUrl === resource.url && (
          <audio controls autoPlay className="mt-4 w-full">
            <source src={resource.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Psychoeducational Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive mental wellness resources in multiple languages to support your journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources, topics, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Resource Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources(category.id).map((resource, index) => (
                  <ResourceCard key={index} resource={resource} type={category.id} />
                ))}
              </div>
              {filteredResources(category.id).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or browse other categories</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* AI Summary Dialog */}
        <Dialog open={isSummaryDialogOpen} onOpenChange={setIsSummaryDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>AI-Generated Summary</span>
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {isSummaryLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader className="h-6 w-6 animate-spin mr-2" />
                  <span className="text-muted-foreground">Generating summary...</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Generate Meditation Script Section */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">✨ Generate Guided Meditation</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Get a custom, guided meditation script tailored to your needs.
            </p>
            <div className="space-y-4">
              <Input
                placeholder="e.g., for focus, for sleep, for reducing anxiety"
                value={meditationTopic}
                onChange={(e) => setMeditationTopic(e.target.value)}
              />
              <Button 
                variant="wellness" 
                className="w-full"
                onClick={handleGenerateScript}
                disabled={isScriptLoading}
              >
                {isScriptLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Script
                  </>
                )}
              </Button>
              {generatedScript && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Your Custom Meditation Script</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{generatedScript}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
