
//DEPRECATED ROUTE

"use client";


import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";

interface Video {
    url: string;
    // Add other fields if necessary (e.g., _id, createdAt)
  }

const CourseVideos = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const { data: session } = useSession();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching videos for Course ID:", courseId);
        const response = await axios.get(`/api/fetch-course-videos`, {
          params: { courseId },
        });
        console.log("Videos fetched:", response.data.videos);
        setVideos(response.data.videos);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchVideos();
  }, [courseId]);

  console.log("Rendered Videos", videos);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-6">Videos for Course</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-600">Loading videos...</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos && videos.length > 0 ? (
          videos.map((video, index) => {
           return <Card key={index} className="border border-gray-200 shadow-md">
              <CardHeader className="relative overflow-hidden h-48">
                <video
                  controls
                  className="object-cover w-full h-full"
                  src={video?.url}
                />
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">Video {index + 1}</p>
              </CardContent>
            </Card>
            }
          )
        ) : (
          <p className="text-gray-600">No videos available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default CourseVideos;


