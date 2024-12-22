import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Rocket, Users, Award } from 'lucide-react'
import RazorpayPaymentButton from "./RazorpayButton"
import { useSession } from "next-auth/react"


interface Course {
  _id: string;
  price: number;
  title?: string;
  description?: string;
  thumbnail?: string;
}

// Properly type the props of the component
interface CourseFeaturedProps {
  course: Course; 
}

export default function CourseFeatured({course}:CourseFeaturedProps) {
  const{data:session} = useSession()
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <Card className="w-full mx-auto overflow-hidden backdrop-blur-sm border-none">
          <CardContent className="p-6 md:p-12 grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Transform Your Future
              </h2>
              <p className="text-xl text-gray-600 max-w-md">
                Embark on a journey of knowledge and innovation. Our cutting-edge curriculum is designed to propel your career forward.
              </p>
           <RazorpayPaymentButton amount={course?.price} courseId={[course._id]} userId={session?.user?._id}>
           <Button size="lg" className="w-full sm:w-auto hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300">
                Enroll Now
              </Button>
           </RazorpayPaymentButton>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <FeatureIcon icon={BookOpen} color="text-indigo-500" text="Expert-Led Content" />
              <FeatureIcon icon={Rocket} color="text-purple-500" text="Hands-On Projects" />
              <FeatureIcon icon={Users} color="text-pink-500" text="Collaborative Learning" />
              <FeatureIcon icon={Award} color="text-indigo-500" text="Industry Certification" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function FeatureIcon({ icon: Icon, color, text }: { icon: React.ElementType, color: string, text: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mb-3 transition-transform duration-300 hover:scale-110`}>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  )
}

