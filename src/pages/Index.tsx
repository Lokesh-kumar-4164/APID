import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "../assets/zoomed_logo.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  BookOpen,
  Users,
  BarChart3,
  Shield,
  Heart,
  Phone,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";
import { useQuestionnaireStore } from "@/store/AuthStore";

type IndexProps = {
  isLogin: boolean;
}
const Index:React.FC<IndexProps> = (props) => {
  const {questionnaireDone,setQuestionnaireDone} = useQuestionnaireStore();
  const services = [
    {
      title: "Confidential Booking",
      description:
        "Schedule appointments with on-campus counselors or access mental health helpline",
      icon: Calendar,
      href: "/booking",
      color: "trust",
      features: ["Private & Secure", "24/7 Helpline", "Licensed Counselors"],
    },
    {
      title: "Resource Hub",
      description:
        "Videos, audio guides, and wellness materials in multiple regional languages",
      icon: BookOpen,
      href: "/resources",
      color: "wellness",
      features: ["Multi-language", "Self-paced", "Expert Curated"],
    },
    {
      title: "Peer Support",
      description:
        "Connect with trained student volunteers in moderated support forums",
      icon: Users,
      href: "/support",
      color: "support",
      features: ["Peer-to-peer", "Moderated", "Anonymous"],
    },
    {
      title: "Admin Dashboard",
      description:
        "Anonymous analytics for authorities to recognize trends and plan interventions",
      icon: BarChart3,
      href: "/admin",
      color: "secondary",
      features: ["Data Analytics", "Trend Analysis", "Privacy-first"],
    },
  ];

  const stats = [
    { number: "1,847", label: "Students Supported", icon: Users },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
    { number: "24/7", label: "Crisis Support", icon: Phone },
    { number: "100%", label: "Confidential", icon: Shield },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-accent/20">
        <div className="absolute inset-0 opacity-10">
          <img
            src={heroImage}
            alt="Mental wellness illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              {/* <img src={Logo} alt="APID Logo" className="h-12 w-20 mr-4" /> */}
              {/* <Shield className="h-12 w-12 text-primary mr-4" /> */}
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground">
                <span className="text-primary">APID</span>
                <p className="text-[1.2rem] mt-2 opacity-70">-- Assistance Platform for Interactive Dialogue --</p>
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Comprehensive mental health support platform providing
              confidential counseling, peer support, and wellness resources for
              campus students
            </p>
            <div className="flex items-center justify-center mb-8 space-x-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Shield className="h-4 w-4 mr-2" />
                100% Confidential
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Clock className="h-4 w-4 mr-2" />
                24/7 Support
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Heart className="h-4 w-4 mr-2" />
                Student-Centered
              </Badge>
            </div>
            {/* {isLogin && <div>
                <h2>You have not logged in</h2>
                <h2>Please Login to attend Questionaire</h2>
                <button>Login</button>
            </div>} */}
            
            {props.isLogin? 
            (questionnaireDone ? <></>:(
              <div className="max-w-md mx-auto mb-6 p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Take this short survey to get started
                </h2>
                <h2 className="text-gray-600 mb-4">
                  Answer these questions to let us know about you current mental health status
                </h2>
                <Link to="/questionnaire">
                <Button variant="trust" size="lg" className="px-8 py-3 text-lg">
                  Questionnaire
                </Button>
                </Link>
              </div>
            )): (
              <div className="max-w-md mx-auto mb-6 p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  You are not logged in
                </h2>
                <h2 className="text-gray-600 mb-4">
                  Please login to attend the Questionnaire
                </h2>
                <Link to="/login">
                <Button variant="trust" size="lg" className="px-8 py-3 text-lg">
                  Login
                </Button>
                </Link>
              </div>
            )
            }

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button variant="trust" size="lg" className="px-8 py-3 text-lg">
                  Book Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/chatpage">
                <Button
                  variant="wellness"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  Chat with AI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive mental health support designed specifically for
              campus life
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, fIndex) => (
                          <Badge
                            key={fIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Link to={service.href}>
                        <Button
                          variant={service.color as any}
                          className="w-full group-hover:shadow-md transition-all"
                        >
                          Access {service.title}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            You're Not Alone in This Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Take the first step towards better mental health. Our platform
            provides safe, confidential support whenever you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="trust" size="lg" className="px-8 py-3">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="support" size="lg" className="px-8 py-3">
                Connect with Peers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
