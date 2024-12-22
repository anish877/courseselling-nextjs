'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const CourseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be 500 characters or less'),
  price: z.number().min(0, 'Price must be a positive number'),
  thumbnail: z.string().url('Must be a valid URL'),
  videos: z.array(z.string().url('Must be a valid URL')).optional(),
});

type CourseFormData = z.infer<typeof CourseSchema>;

const AdminPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const form = useForm<CourseFormData>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      thumbnail: '',
      videos: [],
    },
  });

  useEffect(() => {
    const verifyAdmin = async () => {
      if (status === 'loading') return;

      if (status === 'unauthenticated') {
        router.push('/login');
        return;
      }

      if (status === 'authenticated') {
        try {
          if (session?.user?.isAdmin) {
            setIsAdmin(true);
          } else {
            router.push('/all-courses');
          }
        } catch (error) {
          console.error('Error verifying admin:', error);
          toast({
            title: "Error",
            description: "Failed to verify admin status. Please try again.",
            variant: "destructive",
          });
          router.push('/');
        } finally {
          setLoading(false);
        }
      }
    };

    verifyAdmin();
  }, [status, session, router, toast]);

  const onSubmit = async (data: CourseFormData) => {
    setLoading(true);
    try {
      const response = await axios.post<{ success: boolean; message: string }>(
        `/api/admin/${session?.user?.username}`,
        data
      );
      toast({
        title: "Success",
        description: response.data.message,
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: 'An error occurred while adding the course. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You do not have permission to access this page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add a New Course</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter the course title" />
                    </FormControl>
                    <FormDescription>
                      Provide a clear and concise title for the course.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Describe the course content" />
                    </FormControl>
                    <FormDescription>
                      Briefly describe what this course is about.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter the course price"
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Set a price for the course (e.g., 199).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        placeholder="Enter the thumbnail URL"
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a link to an image for the course thumbnail.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {loading ? 'Adding Course...' : 'Add Course'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;

