import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Star, ChevronDown, ChevronUp, Loader2, BookOpen, Users, PlayCircle, ShoppingCart, Info } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CourseCardProps {
  courseId: string
  title: string
  description: string
  price: number
  thumbnail: string
  onViewClick: () => void
  onWatchClick: () => void
  onAddToCartClick: () => void
  addVideo: () => void
  isAdmin: boolean | undefined
  isLoading?: boolean
  purchasedCourseId?: string
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
  thumbnail = "/placeholder.svg?height=400&width=600",
  onViewClick,
  onWatchClick,
  onAddToCartClick,
  addVideo,
  isAdmin = false,
  isLoading = false,
  purchasedCourseId,
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
  const [isHovered, setIsHovered] = useState(false)
  const [showShine, setShowShine] = useState(false)
  const isPurchased = purchasedCourseId === courseId
  console.log(isPurchased)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full animate-pulse" />
          <Loader2 className="animate-spin h-12 w-12 text-primary relative" />
        </div>
      </div>
    )
  }

  return (
    <Card 
      className="w-full max-w-md overflow-hidden relative group"
      onMouseEnter={() => {
        setIsHovered(true)
        setShowShine(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowShine(false)
      }}
    >
      {/* Card content */}
      <div className="relative overflow-hidden">
        <motion.div
          className="relative h-48"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Play button overlay for purchased courses */}
          {isPurchased && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-white/20 backdrop-blur-sm p-4"
              >
                <PlayCircle className="w-12 h-12 text-white" onClick={onWatchClick} />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2"
          >
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
              {level}
            </Badge>
            <Badge className="bg-black/50 text-white backdrop-blur-sm flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {(price/20).toFixed()}% Enrolled
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="bg-yellow-500/90 text-white backdrop-blur-sm flex items-center">
              <Star className="w-3 h-3 mr-1" />
              {rating}
            </Badge>
          </motion.div>
        </div>

        {/* Admin button */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4"
          >
            <Button
              variant="default"
              className="bg-white/90 text-black hover:bg-white/100 backdrop-blur-sm"
              onClick={addVideo}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Add Videos
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold leading-tight line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-xl p-3 flex items-center justify-center">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">{duration}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span className='text-sm text-muted-foreground mb-4'>% of students completed this course</span>
            <span>{(price/20).toFixed()}%</span>
          </div>
          <Progress 
            value={price/20} 
            className="h-2 bg-muted"
          />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pt-2 space-y-4">
                <h4 className="font-semibold text-sm flex items-center">
                  <Info className="w-4 h-4 mr-2 text-primary" />
                  Course Features
                </h4>
                <ul className="grid grid-cols-1 gap-3">
                  {features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-sm text-muted-foreground flex items-center bg-muted/30 p-3 rounded-lg"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex flex-col items-stretch gap-4">
        {isPurchased ? (
          <Button
            variant="default"
            className="w-full py-6 bg-primary hover:bg-primary/90 transition-colors"
            onClick={onWatchClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span className="flex items-center">
                <PlayCircle className="w-5 h-5 mr-2" />
                Continue Learning
              </span>
            )}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">₹{price}</span>
                <span className="text-xs text-muted-foreground">One-time payment</span>
              </div>
              <motion.div
                initial={false}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                className="flex gap-2"
              >
                <Button
                  variant="outline"
                  className="px-4 py-2 border-primary/20 hover:border-primary transition-colors"
                  onClick={onAddToCartClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart
                    </span>
                  )}
                </Button>
                <Button
                  variant="default"
                  className="px-4 py-2"
                  onClick={onViewClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="flex items-center">
                      <Info className="w-4 h-4 mr-2" />
                      Details
                    </span>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        )}

        <Button 
          variant="ghost" 
          className="w-full hover:bg-muted/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-sm">{isExpanded ? 'Show Less' : 'Show More'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="ml-2 h-4 w-4" />
          </motion.div>
        </Button>
      </CardFooter>
    </Card>
  )
}