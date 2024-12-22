'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, CheckCircle, Clock, BarChart, Award, Loader2 } from 'lucide-react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import RazorpayPaymentButton from '@/components/RazorpayButton'
import { useSession } from 'next-auth/react'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { CheckoutDetails } from '@/components/CheckoutDetails'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import CourseFaq from '@/components/CourseFaq'
import CourseFeatured from '@/components/CourseFeatured'

type Course = {
  _id: string
  title: string
  description: string
  price: number
  thumbnail: string
  duration?: string
  previewVideo: string;
  instructor: string;
  totalDuration: number;
  category: string;
};

const testimonials = [
  {
    quote: "The course structure was exceptional! Each module built on the previous one, making even the most advanced topics easy to follow.",
    name: "Liam Thompson",
    title: "Software Engineer",
    avatar: "https://via.placeholder.com/150",
    rating: 5,
    helpfulVotes: 124,
    date: "2024-10-15",
  },
  {
    quote: "Learnix really knows how to deliver top-notch courses. The intuitive interface and easy navigation helped me focus entirely on learning.",
    name: "Rohan Mehta",
    title: "UI/UX Designer",
    avatar: "https://via.placeholder.com/150",
    rating: 4,
    helpfulVotes: 87,
    date: "2024-11-01",
  },
  {
    quote: "This course gave me the confidence to take on new challenges at work. The combination of theory and practical applications was perfect.",
    name: "Noah Walker",
    title: "Project Manager",
    avatar: "https://via.placeholder.com/150",
    rating: 5,
    helpfulVotes: 92,
    date: "2024-09-28",
  },
  {
    quote: "The course was a game-changer. I went from knowing very little about the subject to confidently applying it in real-world projects.",
    name: "Aditya Sen",
    title: "Cybersecurity Analyst",
    avatar: "https://via.placeholder.com/150",
    rating: 5,
    helpfulVotes: 110,
    date: "2024-08-21",
  },
];

const testimonials2 = [
  {
    quote: "The instructor's approach was unique, and the practical examples made the learning process truly enjoyable.",
    name: "Ananya Sharma",
    title: "Data Scientist",
    avatar: "https://via.placeholder.com/150",
    rating: 5,
    helpfulVotes: 145,
    date: "2024-11-10",
  },
  {
    quote: "Thanks to this course, I was able to land my dream job. The content is detailed, yet easy to understand.",
    name: "Sophia Davis",
    title: "Machine Learning Engineer",
    avatar: "https://via.placeholder.com/150",
    rating: 5,
    helpfulVotes: 138,
    date: "2024-10-20",
  },
  {
    quote: "The real-world case studies in the course added so much value. I could immediately apply what I learned.",
    name: "Aditi Gupta",
    title: "Business Analyst",
    avatar: "https://via.placeholder.com/150",
    rating: 4,
    helpfulVotes: 120,
    date: "2024-10-05",
  },
  {
    quote: "The interactive format and step-by-step guidance set this course apart from others. Highly recommend it!",
    name: "Arjun Nair",
    title: "Software Developer",
    avatar: "https://via.placeholder.com/150",
    rating: 5,
    helpfulVotes: 156,
    date: "2024-09-18",
  },
];

const courseDetails = {
  title: "Advanced React and Next.js Development",
  slogan: "Master modern web development and take your career to the next level",
  videoUrl: "https://videos.pexels.com/video-files/8814086/8814086-sd_640_360_25fps.mp4",
  enrolledStudents: 15420,
  refundPolicy: "100% money-back guarantee for 30 days",
  price: 99.99,
  rating: 4.8,
  totalRatings: 2150,
  instructor: {
    name: "Jane Doe",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Senior Software Engineer with 10+ years of experience in React and Next.js"
  },
  duration: "10 weeks",
  level: "Intermediate",
  topics: ["React Hooks", "Next.js 13", "Server Components", "API Routes", "Authentication", "Deployment"],
  curriculum: [
    { title: "Introduction to Advanced React Concepts", duration: "1 week" },
    { title: "Deep Dive into Next.js 13 Features", duration: "2 weeks" },
    { title: "Building Scalable Applications", duration: "3 weeks" },
    { title: "Advanced State Management", duration: "2 weeks" },
    { title: "Testing and Deployment", duration: "2 weeks" },
  ]
}

export default function CourseDetail() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course_id")
  const [course, setCourse] = useState<Course | null>(null);
  const {data: session} = useSession()
  const [purchasedCoursesId, setPurchasedCoursesId] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const purchasedCourseId = purchasedCoursesId.includes(`${courseId}`) ? courseId : ""
  const isPurchased = purchasedCourseId === courseId
  const router = useRouter()

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<{ courses: Course[] }>("/api/all-purchased-courses");
        setPurchasedCoursesId(response.data.courses.map((course) => course._id));
      } catch (error) {
        console.error("Failed to fetch purchased courses", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchPurchasedCourses();
    }
  }, [session]);
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(`api/get-course-by-id`, {courseId});
        if(response) {
          setCourse(response?.data?.course);
        }
      } catch (error) {
        console.log(`Error in fetching from ::"get course by Id" ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);
  
  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Loader2 className='animate-spin w-8 h-8'/>
      </div>
    );
  }

  if (!course) {
    return (
      <div className='h-screen flex items-center justify-center flex-col gap-4'>
        <p className='text-lg text-gray-500'>Course not found</p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            {courseDetails.level} • {courseDetails.duration}
          </Badge>
          <h1 className="text-4xl font-extrabold dark:text-gray-400 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
            {course?.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">{course?.description}</p>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl font-bold text-yellow-500">{courseDetails.rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(courseDetails.rating) ? 'text-yellow-500' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-500">({courseDetails.totalRatings} ratings)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <video
                src={course?.previewVideo}
                controls
                className="rounded-lg shadow-lg"
              ></video>
            </div>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className='w-full grid grid-cols-3'>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4">What you&apos;ll learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courseDetails.topics.map((topic, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="curriculum">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4">Course Curriculum</h3>
                    <ul className="space-y-4">
                      {courseDetails.curriculum.map((item, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-lg font-semibold mr-2">{index + 1}.</span>
                            <span>{item.title}</span>
                          </div>
                          <Badge variant="outline">{item.duration}</Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="instructor">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-16 w-16 mr-4">
                        <AvatarImage src={courseDetails.instructor.avatar} alt={courseDetails.instructor.name} />
                        <AvatarFallback>{courseDetails.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-2xl font-bold">{courseDetails.instructor.name}</h3>
                        <p className="text-gray-500">{courseDetails.instructor.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
          <Card className="sticky top-4">
  <CardContent className="p-6">
    {isPurchased ? (
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
        <Button 
          variant="ghost" 
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
          onClick={() => router.push(`/channel/${course?._id}`)}
        >
          Resume Course
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Pick up where you left off
        </p>
      </div>
    ) : (
      <div className="text-center mb-6">
        <p className='line-through text-rose-400'>₹{course?.price*5}</p>
        <p className="text-3xl font-bold mb-2">₹{course?.price}</p>
        <RazorpayPaymentButton 
          amount={course.price} 
          courseId={[course._id]} 
          userId={session?.user?._id}
        >
          <Button 
            variant="default"
            className="w-full h-12 text-lg font-semibold"
          >
            Enroll Now
          </Button>
        </RazorpayPaymentButton>
        <p className="mt-2 text-sm text-gray-500">{courseDetails.refundPolicy}</p>
      </div>
    )}
    <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{courseDetails.enrolledStudents.toLocaleString()} students enrolled</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{courseDetails.duration} of content</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{courseDetails.level} level</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-gray-400 mr-2" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Not sure if this course is for you?</h3>
          <p className="text-gray-500 mb-4">Try it risk-free with our 30-day money-back guarantee!</p>
          <Button variant="outline" size="lg">
            Download Course Syllabus
          </Button>
        </div>
      </div>
      <CheckoutDetails />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Hear from Our Satisfied Customers
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
              Discover why students trust us to drive their success
            </p>
          </div>
          <InfiniteMovingCards items={testimonials} speed="slow" />
          <InfiniteMovingCards items={testimonials2} speed="slow" direction='right' />
          <CourseFaq />
        </div>
        <CourseFeatured course={course}/>
      </div>
    </div>
  )
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}