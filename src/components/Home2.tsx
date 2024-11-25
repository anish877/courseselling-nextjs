'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, ChevronRight } from 'lucide-react';
import axios from "axios";
import Link from "next/link";


// const courses: Course[] = [
//   {
//     id: 1,
//     title: "Mastering JavaScript",
//     description: "Learn JavaScript from basics to advanced with real-world projects and expert mentorship.",
//     image: "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
//     video: "https://videos.pexels.com/video-files/5302513/5302513-sd_640_360_25fps.mp4",
//     buttonText: "Buy Now",
//     price: "₹74",
//     discount: "78% Disc. ₹339",
//     rating: 4.8,
//     students: 15000,
//     duration: "20 hours",
//     level: "Beginner to Advanced",
//   },
//   {
//     id: 2,
//     title: "UI/UX Design Fundamentals",
//     description: "Design stunning user interfaces and deliver exceptional user experiences with this course.",
//     image: "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
//     video: "https://www.w3schools.com/html/movie.mp4",
//     buttonText: "Buy Now",
//     price: "₹90",
//     discount: "50% Disc. ₹180",
//     rating: 4.7,
//     students: 12000,
//     duration: "15 hours",
//     level: "Intermediate",
//   },
//   {
//     id: 3,
//     title: "Python for Data Science",
//     description: "Master Python programming and its applications in data science and machine learning.",
//     image: "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
//     video: "https://www.w3schools.com/html/movie.mp4",
//     buttonText: "Buy Now",
//     price: "₹120",
//     discount: "40% Disc. ₹200",
//     rating: 4.9,
//     students: 18000,
//     duration: "25 hours",
//     level: "Intermediate to Advanced",
//   },
//   {
//     id: 4,
//     title: "Web Development Bootcamp",
//     description: "Comprehensive course covering front-end and back-end technologies for full-stack development.",
//     image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600",
//     video: "https://videos.pexels.com/video-files/5302513/5302513-sd_640_360_25fps.mp4",
//     buttonText: "Buy Now",
//     price: "₹150",
//     discount: "30% Disc. ₹215",
//     rating: 4.8,
//     students: 20000,
//     duration: "30 hours",
//     level: "Beginner to Advanced",
//   },
// ];


//Real Backend Data

interface SimpleCourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function CourseDetailsPage() {
  // const [open, setOpen] = useState(false);
  // const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseData, setCourseData] = useState<SimpleCourse[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/get-all-courses");
        setCourseData(response.data.courses);
        console.log("all courses::",response.data.courses)
      } catch (err) {
          console.log(err)
      }finally{
      }
    };

    fetchCourses();
  }, []);

  // const handleCourseClick = (course: Course) => {
  //   setSelectedCourse(course);
  //   setOpen(true);
  // };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-40">
      <div className="container mx-auto space-y-16">
        <h1 className="text-center text-3xl sm:text-4xl font-bold mb-10">
          Explore Our Popular Courses
        </h1>

        {courseData?.map((course, index) => (
          <div
            key={course?._id}
            className={`flex flex-col lg:flex-row items-center ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } gap-12`}
          >
            <div className="w-full lg:w-1/2">
              <Card className="overflow-hidden shadow-md">
                <CardHeader className="p-0">
                  <Image
                    src={course?.thumbnail}
                    alt={course?.title}
                    width={600}
                    height={400}
                    className="w-full h-[300px] object-cover"
                  />
                </CardHeader>
                <CardFooter className="text-center py-2">
                  <Badge variant="default">Advance</Badge>
                </CardFooter>
              </Card>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl font-bold mb-4">{course?.title}</h2>
              <p className="text-base mb-6">
                {course?.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> { 4.8}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-4 h-4" />  12000 students
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 8 hours
                </Badge>
              </div>
              <Link href={`/checkout?course_id=${course._id}`}>
              <Button
                className="px-6 py-2 text-sm font-medium"
                // onClick={() => handleCourseClick(course)}
              >
                Learn More <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

