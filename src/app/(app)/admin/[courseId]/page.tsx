"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getSession } from "next-auth/react"; // Assuming you're using next-auth

const AddVideos = () => {
  const { courseId } = useParams();
  const router = useRouter();

  const [videoUrls, setVideoUrls] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddField = () => {
    setVideoUrls([...videoUrls, ""]);
  };

  const handleRemoveField = (index: number) => {
    setVideoUrls(videoUrls.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string) => {
    const updatedUrls = [...videoUrls];
    updatedUrls[index] = value;
    setVideoUrls(updatedUrls);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const session = await getSession(); // Get session to retrieve username
      const username = session?.user?.username;

      if (!username) {
        throw new Error("User not authenticated");
      }

      await axios.patch(`/api/admin/${username}/add-video`, {
        courseId,
        videos: videoUrls.map((url) => ({ url })),
      });

      router.push(`/admin/${courseId}`); // Redirect to the course details page
    } catch (err: unknown) {
      if (err instanceof Error) {
      setError(err.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-6">Add Videos to Course</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {videoUrls.map((url, index) => (
        <div key={index} className="flex gap-4 mb-4">
          <Input
            type="text"
            value={url}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Video URL #${index + 1}`}
            className="flex-grow"
          />
          <Button variant="destructive" onClick={() => handleRemoveField(index)}>
            Remove
          </Button>
        </div>
      ))}

      <Button variant="secondary" onClick={handleAddField} className="mb-6">
        Add Another URL
      </Button>

      <Button
        variant="default"
        onClick={handleSubmit}
        disabled={loading || videoUrls.some((url) => !url.trim())}
      >
        {loading ? "Adding..." : "Submit"}
      </Button>
    </div>
  );
};

export default AddVideos;
