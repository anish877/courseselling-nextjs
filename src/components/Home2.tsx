import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, ChevronRight, BookOpen, Trophy, Tag } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface SimpleCourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function CourseDetailsPage() {
  const [courseData, setCourseData] = useState<SimpleCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/get-all-courses");
        setCourseData(response.data.courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore Our Popular Courses
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transform your skills with industry-leading courses designed by experts
            </p>
          </div>

          <div className="space-y-20">
            {courseData?.map((course, index) => (
              <div
                key={course?._id}
                className="group"
              >
                <div className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}>
                  <div className="w-full lg:w-1/2 transition-transform duration-300 group-hover:scale-[1.02]">
                    <Card className="overflow-hidden">
                      <CardHeader className="p-0 relative">
                        <div className="absolute top-4 right-4 z-10">
                          <Badge>Featured</Badge>
                        </div>
                        <Image
                          src={course?.thumbnail}
                          alt={course?.title}
                          width={600}
                          height={400}
                          className="w-full h-[400px] object-cover"
                        />
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" /> Advanced Level
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Tag className="w-4 h-4" /> Best Seller
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl font-bold mb-6 text-foreground">
                      {course?.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {course?.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      <div className="p-4 bg-card rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span className="font-semibold">4.8 Rating</span>
                        </div>
                        <p className="text-sm text-muted-foreground">From 2.5k reviews</p>
                      </div>
                      
                      <div className="p-4 bg-card rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="font-semibold">12k Students</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Enrolled worldwide</p>
                      </div>
                      
                      <div className="p-4 bg-card rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="w-5 h-5 text-primary" />
                          <span className="font-semibold">Certificate</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Upon completion</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <Link href={`/checkout?course_id=${course._id}`}>
                        <Button
                          className="px-8 py-6 text-base font-semibold"
                        >
                          Enroll Now <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">8 weeks • Self-paced</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}