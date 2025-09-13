import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Download, 
  BookOpen, 
  Headphones, 
  Video, 
  Search,
  Clock,
  Star,
  Globe
} from "lucide-react";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
        category: "Academic Stress"
      },
      {
        title: "अध्ययन की चिंता से निपटना",
        description: "Study anxiety management in Hindi",
        duration: "15 min",
        language: "Hindi",
        difficulty: "Beginner",
        thumbnail: "🧘",
        category: "Anxiety"
      },
      {
        title: "Mindful Breathing Exercises",
        description: "Simple breathing techniques for instant calm",
        duration: "8 min",
        language: "English",
        difficulty: "Beginner",
        thumbnail: "🌬️",
        category: "Mindfulness"
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
        category: "Sleep"
      },
      {
        title: "मेडिटेशन गाइड",
        description: "Daily meditation practice in Hindi",
        duration: "10 min",
        language: "Hindi",
        difficulty: "Beginner",
        thumbnail: "🧘‍♀️",
        category: "Meditation"
      },
      {
        title: "Focus Enhancement Sounds",
        description: "Background sounds for studying",
        duration: "45 min",
        language: "Universal",
        difficulty: "Any",
        thumbnail: "🎵",
        category: "Focus"
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
        category: "Study Skills"
      },
      {
        title: "डिप्रेशन को समझना",
        description: "Understanding and coping with depression",
        duration: "8 min read",
        language: "Hindi",
        difficulty: "Beginner",
        thumbnail: "💙",
        category: "Mental Health"
      },
      {
        title: "Social Anxiety Toolkit",
        description: "Practical strategies for social situations",
        duration: "6 min read",
        language: "English",
        difficulty: "Intermediate",
        thumbnail: "👥",
        category: "Social Skills"
      }
    ]
  };

  const languages = ["All Languages", "English", "Hindi", "Tamil", "Bengali"];

  const filteredResources = (type: keyof typeof resources) => {
    return resources[type].filter(resource =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const ResourceCard = ({ resource, type }: { resource: any, type: string }) => (
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
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{resource.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>{resource.language}</span>
            </div>
          </div>
          <Badge variant="outline">{resource.category}</Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="wellness" className="flex-1">
            {type === "videos" ? <Play className="h-4 w-4 mr-2" /> : 
             type === "audio" ? <Headphones className="h-4 w-4 mr-2" /> :
             <BookOpen className="h-4 w-4 mr-2" />}
            {type === "guides" ? "Read" : "Play"}
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
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
                {filteredResources(category.id as keyof typeof resources).map((resource, index) => (
                  <ResourceCard key={index} resource={resource} type={category.id} />
                ))}
              </div>
              {filteredResources(category.id as keyof typeof resources).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or browse other categories</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Language Support Notice */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Globe className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Multilingual Support</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              We offer resources in multiple regional languages to ensure accessibility for all students.
              Currently available in English, Hindi, Tamil, and Bengali with more languages being added.
            </p>
            <div className="flex flex-wrap gap-2">
              {languages.slice(1).map((lang) => (
                <Badge key={lang} variant="outline">{lang}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;