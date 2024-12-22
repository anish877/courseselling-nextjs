import React from 'react';
import { Shield, Award, Users, Code, Palette, BarChart, Microscope, Lock, CreditCard, FileCheck, ChevronRight, Link } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EnhancedHome() {
  const trustFactors = [
    { 
      icon: Shield, 
      title: "Secure & Reliable", 
      description: "Our platform uses state-of-the-art encryption and security measures to protect your data and privacy.",
      stat: "99.9%",
      statLabel: "Uptime" 
    },
    { 
      icon: Award, 
      title: "Industry-Recognized Certifications", 
      description: "Earn certificates accredited by leading institutions and valued by top employers worldwide.",
      stat: "50K+",
      statLabel: "Certified Graduates" 
    },
    { 
      icon: Users, 
      title: "Learn from the Best", 
      description: "Our instructors are industry experts with years of real-world experience in their fields.",
      stat: "250+",
      statLabel: "Expert Instructors" 
    },
  ];

  const securityFeatures = [
    { icon: Lock, text: "End-to-end encryption for all data transmissions", highlight: "256-bit" },
    { icon: Shield, text: "Regular third-party security audits and penetration testing", highlight: "SOC 2" },
    { icon: FileCheck, text: "GDPR and CCPA compliant data handling practices", highlight: "Certified" },
    { icon: CreditCard, text: "PCI DSS compliant secure payment processing", highlight: "Level 1" },
  ];

  const courseCategories = [
    { icon: Code, name: "Programming & Development", count: 150, color: "text-blue-500", bgColor: "bg-blue-100", courses: ["Web Development", "Mobile Apps", "Cloud Computing"] },
    { icon: Palette, name: "Design & Creativity", count: 120, color: "text-purple-500", bgColor: "bg-purple-100", courses: ["UI/UX Design", "Graphic Design", "Motion Graphics"] },
    { icon: BarChart, name: "Business & Marketing", count: 100, color: "text-green-500", bgColor: "bg-green-100", courses: ["Digital Marketing", "SEO", "Analytics"] },
    { icon: Microscope, name: "Science & Technology", count: 80, color: "text-red-500", bgColor: "bg-red-100", courses: ["Data Science", "AI/ML", "Robotics"] },
  ];

  return (
    <div className="py-16 lg:px-40 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-foreground">
            Why Choose Learnix?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join millions of learners worldwide in their journey to excellence
          </p>
        </div>

        {/* Trust Factors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {trustFactors.map((factor, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-none bg-card/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <factor.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-center group-hover:text-primary transition-colors duration-300">
                  {factor.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-center text-muted-foreground">
                  {factor.description}
                </CardDescription>
                <div className="text-center pt-4 border-t border-border/50">
                  <div className="text-2xl font-bold text-foreground">{factor.stat}</div>
                  <div className="text-sm text-muted-foreground">{factor.statLabel}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Features */}
        <Card className="mb-20 overflow-hidden bg-card/50 backdrop-blur-sm border-none">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Enterprise-Grade Security</CardTitle>
            <CardDescription>Your security is our top priority</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {securityFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-4 rounded-lg bg-background/50 hover:bg-primary/5 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">{feature.highlight}</Badge>
                    <p className="text-muted-foreground">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Categories */}
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-3xl font-bold text-foreground">
            Explore Our Course Catalog
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive learning paths designed for your success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courseCategories.map((category, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-none"
            >
              <CardHeader>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <CardTitle className="text-lg text-center group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge variant="secondary" className="w-full text-lg py-1">
                  {category.count}+ courses
                </Badge>
                <ul className="space-y-2">
                  {category.courses.map((course, idx) => (
                    <li key={idx} className="text-muted-foreground text-sm flex items-center">
                      <ChevronRight className="w-4 h-4 mr-1" />
                      {course}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}