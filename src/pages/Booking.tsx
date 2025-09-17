import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Phone, Shield, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    concern: "",
    urgency: "",
    date: "",
    time: "",
  });

  const services = [
    {
      id: "counselor",
      title: "Individual Counseling",
      description: "One-on-one session with a licensed counselor",
      duration: "50 minutes",
      availability: "Mon-Fri, 9AM-5PM",
      icon: User,
    },
    {
      id: "helpline",
      title: "Crisis Helpline",
      description: "Immediate support for urgent situations",
      duration: "Available 24/7",
      availability: "Always available",
      icon: Phone,
    },
    {
      id: "group",
      title: "Group Therapy",
      description: "Supportive group sessions with peers",
      duration: "90 minutes",
      availability: "Wed & Fri, 2PM-3:30PM",
      icon: Heart,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appointment Requested",
      description: "Your confidential appointment request has been submitted. You'll receive confirmation within 24 hours.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Confidential Booking</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule your appointment with complete privacy and confidentiality
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Shield className="h-5 w-5 text-trust" />
            <span className="text-sm text-muted-foreground">100% Confidential & Secure</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Service Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Choose Your Service</h2>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedService === service.id ? "ring-2 ring-primary shadow-md" : ""
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{service.availability}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Booking Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Book Your Appointment</CardTitle>
              <CardDescription>
                Fill out this form to schedule your confidential session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Anonymous is fine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@university.edu"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="concern">Brief Description (Optional)</Label>
                  <Textarea
                    id="concern"
                    value={formData.concern}
                    onChange={(e) => handleInputChange("concern", e.target.value)}
                    placeholder="What would you like to discuss? (Optional for privacy)"
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Within 1-2 weeks</SelectItem>
                      <SelectItem value="medium">Medium - Within 1 week</SelectItem>
                      <SelectItem value="high">High - Within 2-3 days</SelectItem>
                      <SelectItem value="urgent">Urgent - Today/Tomorrow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9AM-12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM-3PM)</SelectItem>
                        <SelectItem value="evening">Evening (3PM-6PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Mode of Meet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online"> Online</SelectItem>
                        <SelectItem value="offline">Offline </SelectItem>
                        
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-4 w-4 text-trust" />
                    <span className="text-sm font-medium">Privacy Notice</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All information is encrypted and confidential. Only licensed professionals will access your data.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="trust"
                  className="w-full"
                  disabled={!selectedService || !formData.email}
                >
                  Schedule Confidential Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;