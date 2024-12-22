import React from 'react'
import { BookOpen, Rocket, Users } from 'lucide-react'

const Banner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center h-full p-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-rose-600">
          Learnix
          </h1>
          <p className="mt-2 text-xl">Empower Your Learning Journey</p>
        </div>

        <h2 className="text-2xl font-semibold light:text-gray-800 text-center">
          Welcome to the Future of Online Education
        </h2>

        <p className="text-gray-600">
          Learnix is your gateway to a world of knowledge. Discover courses taught by industry experts and take your skills to the next level.
        </p>

        <div className="space-y-4 text-black">
          <FeatureItem 
            icon={<BookOpen className="w-6 h-6" />}
            title="Diverse Course Catalog"
            description="Explore a wide range of subjects tailored to your interests and career goals."
          />
          <FeatureItem 
            icon={<Rocket className="w-6 h-6" />}
            title="Learn at Your Own Pace"
            description="Flexible schedules and on-demand content to fit your busy lifestyle."
          />
          <FeatureItem 
            icon={<Users className="w-6 h-6" />}
            title="Collaborative Learning"
            description="Engage with a global community of learners and instructors."
          />
        </div>
      </div>
    </div>
  )
}

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <div className="p-2 bg-blue-100 rounded-full">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}

export default Banner

