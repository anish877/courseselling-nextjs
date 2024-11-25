import React from 'react'
import { Shield, Award, Users, BookOpen, Code, Palette, BarChart, Microscope, CheckCircle, Lock, CreditCard, FileCheck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Home3 = () => {
  const trustFactors = [
    { 
      icon: Shield, 
      title: "Secure & Reliable", 
      description: "Our platform uses state-of-the-art encryption and security measures to protect your data and privacy." 
    },
    { 
      icon: Award, 
      title: "Industry-Recognized Certifications", 
      description: "Earn certificates accredited by leading institutions and valued by top employers worldwide." 
    },
    { 
      icon: Users, 
      title: "Learn from the Best", 
      description: "Our instructors are industry experts with years of real-world experience in their fields." 
    },
  ]

  const securityFeatures = [
    { icon: Lock, text: "End-to-end encryption for all data transmissions" },
    { icon: Shield, text: "Regular third-party security audits and penetration testing" },
    { icon: FileCheck, text: "GDPR and CCPA compliant data handling practices" },
    { icon: CreditCard, text: "PCI DSS compliant secure payment processing" },
  ]

  const courseCategories = [
    { icon: Code, name: "Programming & Development", count: 150, color: "text-blue-600 dark:text-blue-400" },
    { icon: Palette, name: "Design & Creativity", count: 120, color: "text-purple-600 dark:text-purple-400" },
    { icon: BarChart, name: "Business & Marketing", count: 100, color: "text-green-600 dark:text-green-400" },
    { icon: Microscope, name: "Science & Technology", count: 80, color: "text-red-600 dark:text-red-400" },
  ]

  return (
    <div className="py-16 lg:px-40">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
          Why Learnix?
        </h2>

        {/* Trust Factors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {trustFactors.map((factor, index) => (
            <Card key={index} className="border-t-4 border-blue-500 dark:border-blue-400 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <factor.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl text-center">{factor.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{factor.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Features */}
        <Card className="mb-20 border-t-4 border-green-500 dark:border-green-400">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 mr-2 text-green-600 dark:text-green-400" />
              Our Commitment to Your Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                    <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{feature.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Categories */}
        <h3 className="text-3xl font-semibold mb-10 text-center text-gray-800 dark:text-gray-100">
            Diverse Course Catalog
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courseCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-16 h-16 mx-auto mb-4 bg-opacity-20 dark:bg-opacity-20 rounded-full flex items-center justify-center ${category.color.replace('text', 'bg')}`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <CardTitle className="text-lg text-center">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {category.count}+ courses
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home3

