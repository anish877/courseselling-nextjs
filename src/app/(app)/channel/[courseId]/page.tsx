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
import { AlertCircle, CheckCircle, Lock, PlayCircle } from 'lucide-react';
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
};

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const {data: session} = useSession()

  useEffect(() => {
    async function fetchCourseData() {
      if (!courseId) return;
      setLoading(true);
      try {
        const response = await axios.get(`/api/purchased-course/${courseId}`);
        const courseData = response.data;

        setIsPurchased(courseData.success);

        setCourse({
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

        // Calculate initial progress only if the course is purchased
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

  const handleVideoComplete = (index: number) => {
    if (!course || !isPurchased) return;
    const updatedVideos = [...course.videos];
    updatedVideos[index].completed = true;
    setCourse({ ...course, videos: updatedVideos });
    const completedVideos = updatedVideos.filter(video => video.completed).length;
    setProgress((completedVideos / updatedVideos.length) * 100);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="col-span-1 md:col-span-2 space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="col-span-1 space-y-4">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (!course) return <p className="text-center text-2xl mt-20">Course not found.</p>;

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {/* Left Side - Video Player and Accordion for videos */}
      <div className="col-span-1 md:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-0">
            {isPurchased || activeVideoIndex === 0 ? (
              <VideoPlayer
                url={course.videos[activeVideoIndex]?.url}
                title={course.videos[activeVideoIndex]?.title}
                description={course.description}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] bg-gray-200 rounded-lg">
                <Lock className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-xl font-semibold text-gray-600">This content is locked</p>
                <Button variant="default" size="lg" className="mt-4">
                  <RazorpayPaymentButton amount={course.price} courseId={[course.id]} userId={session?.user?._id}>
                    Unlock This Course
                  </RazorpayPaymentButton>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <PlayCircle className="mr-2" /> Course Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {course.videos.map((video, index) => (
                <AccordionItem key={video._id} value={`video-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    <div className="flex items-center justify-between w-full">
                      <span>{video.title || `Video ${index + 1}`}</span>
                      <div className="flex items-center space-x-2">
                        {isPurchased && video.completed && <CheckCircle className="text-green-500" />}
                        <Badge variant={isPurchased || index === 0 ? "secondary" : "destructive"}>
                          {isPurchased ? `${video.duration} min` : index === 0 ? "Free" : "Locked"}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {isPurchased || index === 0 ? (
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveVideoIndex(index)}
                        className="w-full justify-start"
                      >
                        <PlayCircle className="mr-2" /> Play Video
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center h-20 bg-gray-100 rounded">
                        <Lock className="text-gray-400 mr-2" />
                        <p className="text-gray-500">This video is locked</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Course Overview */}
      <div className="col-span-1 space-y-6">
        <Card>
          <CardContent className="p-0">
            {course.thumbnail && (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="rounded-t-lg w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{course.instructor}</span>
                <span>{course.category}</span>
              </div>
              {isPurchased && (
                <>
                  <Progress value={progress} className="mb-2" />
                  <p className="text-sm text-gray-500 text-right">{progress.toFixed(0)}% complete</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Total Duration:</span>
                <span>{course.totalDuration} minutes</span>
              </li>
              <li className="flex justify-between">
                <span>Number of Lessons:</span>
                <span>{course.videos.length}</span>
              </li>
              <li className="flex justify-between">
                <span>Category:</span>
                <span>{course.category}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {!isPurchased && (
          <Card>
            <CardContent className="p-6">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-center text-gray-600 mb-4">
                Unlock this course to access all video content and start learning today!
              </p>
              <Button variant="default" size="lg" className="w-full">
                <RazorpayPaymentButton amount={course.price} courseId={[course.id]} userId={session?.user?._id}>
                  Unlock This Course
                </RazorpayPaymentButton>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

