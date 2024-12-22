'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Search, BookOpen } from 'lucide-react'
import { useSession } from "next-auth/react"

type Course = {
  _id: string
  title: string
  description: string
  thumbnail: string
  price: number
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const {data: session} = useSession()

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true)
      try {
        const response = await axios.get("/api/all-purchased-courses")
        setCourses(response.data.courses || [])
        setFilteredCourses(response.data.courses || [])
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }
    session?fetchCourses():null
  }, [])

  useEffect(() => {
    const results = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCourses(results)
  }, [searchTerm, courses])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <BookOpen className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">No courses available</h2>
        <p className="text-muted-foreground">Start exploring and enroll in new courses!</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-8 lg:mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">My Learning Journey</h1>
      
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No courses match your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course._id} className="flex flex-col shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <img src={course.thumbnail} alt={course.title} className="h-48 w-full object-cover" />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-xl font-bold mb-2">{course.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{course.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 bg-muted/50">
                <Button
                  variant="default"
                  onClick={() => router.push(`/channel/${course._id}`)}
                  className="hover:bg-primary/90"
                >
                  Start Lesson
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

