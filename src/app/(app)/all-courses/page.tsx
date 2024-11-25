// GetAllCourses.tsx

'use client';
import { useCart } from "@/components/cartState/cartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import CourseCard from "@/components/CourseCard";
import { Loader2 } from "lucide-react";
import CourseDetailModal from "@/components/CourseDetailModal";
import {
  ToastProvider,
  Toast,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose
} from "@/components/ui/toast"; 
// import Component from "@/components/SAMPLES";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function GetAllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
  const [purchasedCoursesId, setPurchasedCoursesId] = useState<string[]>([]);

  const {fetchCartItems}= useCart()


  const router = useRouter()
  const { data: session } = useSession();


  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/get-all-courses");
        setCourses(response.data.courses);
        console.log("all courses::",response.data.courses)
      } catch (err) {
        setError("Failed to fetch courses. Please try again later.");
      }finally{
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<{ courses: Course[] }>("/api/all-purchased-courses");//by current user
        setLoading(true)
        console.log("Purchased courses res::", response.data.courses);
        setPurchasedCoursesId(response.data.courses.map((course) => course._id));
      } catch (error) {
        console.error("Failed to fetch purchased courses", error);
      }finally{
        setLoading(false)
      }
    })();
  }, [session, router]);
  
  

  const handleAddToCart = async (course: Course) => {
    setRefresh(true);
    try {
      const addedToCartData = await axios.post("/api/add-to-cart", { courseId: course._id });
      if (addedToCartData) {
        setToastMessage(course.title);
        fetchCartItems();
      }
    } catch (error: any) {
      setError(error?.message);
      setToastMessage(error?.message);
    } finally {
      setRefresh(false);
    }
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };
  const handleAddVideo = (course: Course) => {
    router.push(`/admin/${course._id}`)
  };

  const handleWatchCourse = (course: Course) =>{
    router.push(`/channel/${course?._id}`)
  }

  useEffect(()=>{
    const admin = session?.user?.isAdmin
    setIsAdmin(admin)
  },[session?.user])


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center mb-8">All Courses({courses?.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {courses.map((course) => (
    <CourseCard
      key={course.title}
      courseId={course._id}
      title={course.title}
      description={course.description}
      price={course.price}
      thumbnail={course.thumbnail}
      onViewClick={() => handleViewCourse(course)}
      onWatchClick={() => handleWatchCourse(course)} // Handle watch functionality
      onAddToCartClick={() => handleAddToCart(course)}
      isLoading={loading}
      addVideo={() => handleAddVideo(course)}
      isAdmin={isAdmin}
      purchasedCourseId={purchasedCoursesId.includes(course._id) ? course._id : ""}
    />
  ))}
</div>

      </div>

      <CourseDetailModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse!}
      />

      {toastMessage && (
        <Toast open={!!toastMessage} onOpenChange={() => setToastMessage(null)} className="flex flex-wrap items-center">
          <ToastTitle>{toastMessage}</ToastTitle>
          <ToastDescription>{error ? "Item already in cart" : "Added to cart ✔️"}</ToastDescription>
          <ToastClose />
        </Toast>
      )}
      <ToastViewport />
    </ToastProvider>
  );
}


