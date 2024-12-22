export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    testimonial: string;
    avatar: string;
    rating: number;
  }
  
  export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      testimonial: "Learnix has transformed our team's skill set. The courses are incredibly well-structured and relevant to our industry needs. I've seen a significant boost in our marketing team's performance since we started using Learnix.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      company: "InnovateSoft",
      testimonial: "As a developer, staying updated with the latest technologies is crucial. Learnix provides top-notch content that keeps me ahead of the curve. The hands-on projects have been instrumental in improving my coding skills.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "HR Manager",
      company: "Global Enterprises",
      testimonial: "Learnix has been instrumental in our employee development program. The variety of courses caters to all departments, improving overall productivity. The analytics provided help us track progress effectively.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5
    },
    {
      id: 4,
      name: "David Patel",
      role: "Entrepreneur",
      company: "StartUp Innovators",
      testimonial: "As a startup founder, Learnix has been my go-to resource for acquiring new skills quickly. It's like having a mentor in your pocket. The mobile app makes learning on-the-go a breeze.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5
    }
  ];
  
  