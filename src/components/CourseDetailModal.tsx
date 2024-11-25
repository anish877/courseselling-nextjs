'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import RazorpayPaymentButton from "./RazorpayButton"
import { Clock, User, BarChart } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface CourseDetailModalProps {
  course: SimpleCourse
  open: boolean
  onClose: () => void
}

interface SimpleCourse {
  _id: string
  title: string
  description: string
  price: number
  thumbnail: string
  duration?: string
  instructor?: string
  level?: string
}

const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, open, onClose }) => {
  const { data: session } = useSession()

  if (!course) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{course.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={course.thumbnail}
                alt={course.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">{course.description}</p>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-semibold">What you'll learn:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Comprehensive understanding of the subject</li>
                <li>Practical skills and techniques</li>
                <li>Industry-relevant knowledge</li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between flex-wrap">
          <div>
            <p className="text-2xl font-bold">₹{course.price}</p>
            <Badge variant="secondary" className="mt-1"><Clock className="w-4 h-4 mr-1" />{course.price < 500 ? "Limited Time Offer" : "2 days at this price. Original price: ₹1,399."}</Badge>
          </div>
         <div className="flex gap-2 justify-between">
          <Link href={`/channel/${course._id}`}>
          <Button>Course Contents</Button>
          </Link>
          {/* TODO:: Enroll Now */}
         {/* <RazorpayPaymentButton 
            amount={course.price} 
            courseId={[course._id]} 
            userId={session?.user?._id}
          /> */}
          <Link href={`/checkout?course_id=${course._id}`}>
           <Button>Enroll</Button>
          </Link>
         </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CourseDetailModal

