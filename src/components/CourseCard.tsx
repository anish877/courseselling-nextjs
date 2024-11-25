'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Star, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CourseCardProps {

  courseId: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  onViewClick: () => void;
  onWatchClick: () => void;
  onAddToCartClick: () => void;
  addVideo: () => void; // admin only
  isAdmin: boolean | undefined;
  isLoading?: boolean;
  purchasedCourseId?:string;
  

  imageUrl?: string
  duration?: string
  level?: string
  rating?: number
  features?: string[]
}

export default function CourseCard({
  courseId,
  title = "Advanced Web Development Masterclass",
  description = "Master the latest web technologies and frameworks in this comprehensive course.",
  price = 99.99,
  thumbnail="/placeholder.svg?height=400&width=600",
  onViewClick,
  onWatchClick,
  onAddToCartClick,
  addVideo, // admin only
  isAdmin = false,
  isLoading = true,
  purchasedCourseId,

  imageUrl = "/placeholder.svg?height=400&width=600",
  duration = "10 weeks",
  level = "Intermediate",
  rating = 4.8,
  features = [
    "24/7 access to course materials",
    "Live coding sessions",
    "Personal project reviews",
    "Job placement assistance"
  ]
}: CourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
          {level}
        </Badge>
        
            {/* Admin-only Add Video Button */}
    {isAdmin && (
      <Button
        variant="destructive"
        className="px-4 py-2 text-sm absolute bottom-40"
        onClick={addVideo}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Add Videos"
        )}
      </Button>
    )}

      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
        {description.length > 60 ? `${description.substring(0, 115)}...` : description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>
        <Progress value={price/20} className="mb-2" />
        <p className="text-sm text-muted-foreground mb-4">{(price/20).toFixed()}% of students completed this course</p>
        <motion.div 
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <h4 className="font-semibold mb-2">Course Features:</h4>
          <ul className="list-disc list-inside space-y-1 mb-4">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground">{feature}</li>
            ))}
          </ul>
        </motion.div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">

        <div className="flex justify-between items-center w-full mb-4">
         {/* Conditionally render buttons */}
    {purchasedCourseId === courseId ? (
      <Button
      variant="default"
      className="px-4 py-2 text-sm mx-auto w-full"
      onClick={onWatchClick} // Redirect to course content or watch page
      disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Watch Now"
        )}
      </Button>
    ) : (
      <>
      <span className="text-2xl font-bold">₹{price}</span>
        <Button
          variant="outline"
          className="px-4 py-2 text-sm"
          onClick={onAddToCartClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Add to Cart"
          )}
        </Button>
        <Button
          variant="default"
          className="px-4 py-2 text-sm"
          onClick={onViewClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "View Details"
          )}
        </Button>
      </>
    )}
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              <span>Show More</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

