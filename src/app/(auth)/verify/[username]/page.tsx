'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';
import Banner from '@/components/Banner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';


export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);



  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(`/api/verifycode`, {
        username: params.username,
        code: data.code,
      });

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace('/signin'); //go to login after verification
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Verification Failed',
        description:
          axiosError.response?.data.message ??
          'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex min-h-screen'>
    <div className='hidden lg:block lg:w-1/2'>
      <Banner />
    </div>
    <div className="flex-1 flex justify-center items-center p-8">
      <Card className="w-full max-w-md border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Verify Your Account</CardTitle>
          <CardDescription className="text-center">
            Enter the verification code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Verification Code</FormLabel> */}
                    <Input {...field} 
                     placeholder="Enter your verification code"
                      className="text-center text-lg tracking-widest"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify Account
                  </>
                )}
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
            Did&apos;t receive the code?{' '}
            <Button variant="link" className="p-0 h-auto font-normal">
              <Link href="/signup">Retry signup</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  </div>

  );
}