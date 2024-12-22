"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { VideoPlayer } from "@/components/video-player";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle, Clock, Lock, PlayCircle, Bookmark, User, Tag, Film, ChevronRight } from 'lucide-react';
import RazorpayPaymentButton from "@/components/RazorpayButton";
import { useSession } from "next-auth/react";

type Video = {
  _id: string;
  url: string;
  title: string;
  duration: number;
  completed: boolean;
};

type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  videos: Video[];
  instructor: string;
  totalDuration: number;
  category: string;
  userId: string
};

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    async function fetchCourseData() {
      if (!courseId) return;
      setLoading(true);
      try {
        const response = await axios.get(`/api/purchased-course/${courseId}`);
        const courseData = response.data;
        console.log(courseData)
        setIsPurchased(courseData.success);
        setCourse({
          userId: courseData.userId,
          id: courseData.id,
          price: courseData.price,
          title: courseData.title,
          description: courseData.description,
          thumbnail: courseData.thumbnail,
          videos: courseData.videos || [],
          instructor: courseData.instructor || "Unknown Instructor",
          totalDuration: courseData.totalDuration || 0,
          category: courseData.category || "Uncategorized",
        });

        if (courseData.success && courseData.videos) {
          const completedVideos = courseData.videos.filter((video: Video) => video.completed).length;
          setProgress((completedVideos / courseData.videos.length) * 100);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourseData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-[500px] w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        <div className="col-span-1 space-y-6">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!course) return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <p className="text-3xl font-semibold text-gray-600">Course not found.</p>
    </div>
  );

  return (
    <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
      <div className="col-span-1 md:col-span-2 space-y-8">
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-0">
            {isPurchased || activeVideoIndex === 0 ? (
              <VideoPlayer
                url={course.videos[activeVideoIndex]?.url}
                title={course.videos[activeVideoIndex]?.title}
                description={course.description}
                userId = {course.userId}
                videoId = {course.videos[activeVideoIndex]?._id}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] bg-gray-100 rounded-lg">
                <Lock className="w-20 h-20 text-gray-400 mb-6" />
                <p className="text-2xl font-semibold text-gray-600 mb-4">Premium Content</p>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                  Unlock this course to access all premium videos and start your learning journey
                </p>
                <Button variant="default" size="lg" className="px-8">
                  <RazorpayPaymentButton amount={course.price} courseId={[course.id]} userId={session?.user?._id}>
                    Unlock Full Course
                  </RazorpayPaymentButton>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-bold flex items-center">
              <Film className="mr-3 h-6 w-6" /> Course Content
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {course.videos.map((video, index) => (
                <AccordionItem key={video._id} value={`video-${index}`}>
                  <AccordionTrigger className="text-lg py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-500">#{index + 1}</span>
                        <span>{video.title || `Video ${index + 1}`}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        {isPurchased && video.completed && (
                          <CheckCircle className="text-green-500 h-5 w-5" />
                        )}
                        <Badge variant={isPurchased || index === 0 ? "secondary" : "destructive"} className="px-3 py-1">
                          {isPurchased ? (
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {video.duration} min
                            </span>
                          ) : (
                            index === 0 ? "Free Preview" : "Locked"
                          )}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {isPurchased || index === 0 ? (
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveVideoIndex(index)}
                        className="w-full justify-start py-6 text-lg"
                      >
                        <PlayCircle className="mr-3 h-5 w-5" /> Play Video
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center h-24 bg-gray-50 rounded-lg">
                        <Lock className="text-gray-400 mr-2 h-5 w-5" />
                        <p className="text-gray-500">Premium content - Unlock to access</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1 space-y-8">
        <Card className="shadow-lg overflow-hidden">
          {course.thumbnail && (
            <div className="relative h-48">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Tag className="w-5 h-5 mr-2" />
                <span>{course.category}</span>
              </div>
            </div>

            {isPurchased && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 text-right">{progress.toFixed(0)}% completed</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b">
          <CardTitle className="font-bold flex items-center text-lg">
            <Bookmark className="mr-3 h-5 w-5 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Course Overview
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-4">
            <li className="group flex justify-between items-center py-3 border-b border-dashed hover:border-solid transition-all duration-300">
              <span className="text-gray-600 flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 mr-3 transition-colors duration-300" />
                Total Duration
              </span>
              <span className="font-semibold px-3 py-1 rounded-full">
                {course.totalDuration} minutes
              </span>
            </li>
            <li className="group flex justify-between items-center py-3 border-b border-dashed hover:border-solid transition-all duration-300">
              <span className="text-gray-600 flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 mr-3 transition-colors duration-300" />
                Total Lessons
              </span>
              <span className="font-semibold px-3 py-1 rounded-full">
                {course.videos.length}
              </span>
            </li>
            <li className="group flex justify-between items-center py-3">
              <span className="text-gray-600 flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 mr-3 transition-colors duration-300" />
                Category
              </span>
              <Badge variant="secondary" className="hover:scale-105 transition-transform duration-300">
                {course.category}
              </Badge>
            </li>
          </ul>
        </CardContent>
      </Card>

      {!isPurchased && (
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
              
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full" />
                <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto relative" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Ready to Start Learning?
              </h3>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Get instant access to all videos and start mastering new skills today!
              </p>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/40 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300" />
                <Button 
                  variant="default" 
                  size="lg" 
                  className="relative w-full py-6 text-lg group-hover:scale-[1.01] transition-transform duration-300"
                >
                  <RazorpayPaymentButton 
                    amount={course.price} 
                    courseId={[course.id]} 
                    userId={session?.user?._id}
                  >
                    <span className="flex items-center justify-center">
                      Enroll Now for ${(course.price / 100).toFixed(2)}
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </RazorpayPaymentButton>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  );
}